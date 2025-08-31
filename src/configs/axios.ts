import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'universal-cookie';

import { ApiResponseError } from '@/errors/ApiResponseError';
import type { IApiResponseError } from '@/interfaces/api/IApiResponseError';
import type { IRefreshSessionResponse } from '@/interfaces/auth/IRefreshSessionResponse';
import { StoredCookies } from '@/interfaces/auth/cookies.enum';
import type { IHTTPRequestService } from '@/interfaces/services/IHTTPRequestService';

const cookies = new Cookies();

// Extended request config to track retry attempts
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

// Track ongoing refresh to prevent race conditions
let refreshPromise: Promise<IRefreshSessionResponse> | null = null;

const MAX_RETRY_ATTEMPTS = 1;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get(StoredCookies.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<IApiResponseError>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // If no response or no original request, reject immediately
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle 401 Unauthorized errors
    if (status === 401) {
      // Check if this is a token expiry issue
      const isTokenExpired =
        data?.error === 'TokenExpired' || data?.error === 'Unauthorized';

      // Don't retry refresh endpoint calls or if already retried
      const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh');
      const hasRetried =
        originalRequest._retry ||
        (originalRequest._retryCount ?? 0) >= MAX_RETRY_ATTEMPTS;

      if (isTokenExpired && !isRefreshEndpoint && !hasRetried) {
        // Mark request as retrying
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

        try {
          // If refresh is not in progress, start it
          if (!refreshPromise) {
            refreshPromise = refreshTokens();
          }

          // Wait for refresh to complete
          const refreshResponse = await refreshPromise;

          // Update the authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          clearAuthenticationData();
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          // Clear the refresh promise after completion
          if (originalRequest._retryCount >= MAX_RETRY_ATTEMPTS) {
            refreshPromise = null;
          }
        }
      }

      // If we can't refresh or it's a different 401, clear auth and redirect
      if (!isRefreshEndpoint) {
        clearAuthenticationData();
        redirectToLogin();
      }
    }

    // // Handle other error statuses
    // if (status === 403) {
    //   // Forbidden - user doesn't have permission
    //   console.error('Access forbidden:', originalRequest.url);
    // } else if (status === 429) {
    //   // Too many requests - could implement retry with backoff
    //   console.error('Rate limited:', originalRequest.url);
    // } else if (status >= 500) {
    //   // Server error - could implement retry logic
    //   console.error('Server error:', status, originalRequest.url);
    // }

    // Create and reject with custom error
    const apiError = new ApiResponseError(
      data?.error || 'Unknown error',
      data?.message || error.message,
      status
    );

    return Promise.reject(apiError);
  }
);

// Function to refresh tokens
async function refreshTokens(): Promise<IRefreshSessionResponse> {
  try {
    const currentRefreshToken = cookies.get(StoredCookies.REFRESH_TOKEN);
    const currentUsername = cookies.get(StoredCookies.USERNAME);

    if (!currentRefreshToken || !currentUsername) {
      throw new Error('No refresh token or username available');
    }

    // Make refresh request without interceptors to avoid infinite loop
    const response = await axios.post<IRefreshSessionResponse>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        username: currentUsername,
        refreshToken: currentRefreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken } = response.data;

    // Update only the access token cookie
    const cookieOptions = {
      path: '/',
      secure: import.meta.env.PROD, // Use secure cookies in production
      sameSite: 'strict' as const,
      maxAge: 60 * 15, // 15 minutes for access token
    };

    cookies.set(StoredCookies.ACCESS_TOKEN, accessToken, cookieOptions);

    // Update default headers for future requests
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;

    return response.data;
  } catch (error) {
    // Clear refresh promise on error
    refreshPromise = null;
    throw error;
  }
}

// Function to clear authentication data
function clearAuthenticationData(): void {
  cookies.remove(StoredCookies.ACCESS_TOKEN, { path: '/' });
  cookies.remove(StoredCookies.REFRESH_TOKEN, { path: '/' });
  cookies.remove(StoredCookies.USERNAME, { path: '/' });

  delete axiosInstance.defaults.headers.common['Authorization'];

  refreshPromise = null;
}

function redirectToLogin(): void {
  const isAuthPage = window.location.pathname.startsWith('/auth');
  if (!isAuthPage) {
    window.location.href = '/auth/sign-in';
  }
}

// Create axios service wrapper
function createAxiosService(
  instance: AxiosInstance
): IHTTPRequestService<AxiosRequestConfig> {
  return {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.get<T>(url, config);
      return response.data;
    },

    post: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await instance.post<T>(url, body, config);
      return response.data;
    },

    patch: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await instance.patch<T>(url, body, config);
      return response.data;
    },

    put: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await instance.put<T>(url, body, config);
      return response.data;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.delete<T>(url, config);
      return response.data;
    },

    setAuthentication: (token: string) => {
      // Update both cookie and default header
      const cookieOptions = {
        path: '/',
        secure: import.meta.env.PROD,
        sameSite: 'strict' as const,
        maxAge: 60 * 15, // 15 minutes
      };

      cookies.set(StoredCookies.ACCESS_TOKEN, token, cookieOptions);
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
  };
}

// Export the service
export const axiosService = createAxiosService(axiosInstance);

// Export utility functions for use in other parts of the app
export { clearAuthenticationData, refreshTokens };
