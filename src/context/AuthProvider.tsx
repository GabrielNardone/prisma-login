import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';

import { useLoadingState } from '@/hooks/auth/useAuthState';
import { useTranslation } from '@/hooks/translation/useTranslation';
import { StoredCookies } from '@/interfaces/auth/cookies.enum';
import type { IReactChildrenProps } from '@/interfaces/components/IReactChildren';
import { apiService } from '@/services/api.service';
import { authService } from '@/services/auth.service';
import { cookieService } from '@/services/cookie.service';
import { notificationService } from '@/services/notification.service';

export const AuthProvider = ({ children }: IReactChildrenProps) => {
  const { loadingState, setLoadingState } = useLoadingState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = useCallback(
    async (username: string, password: string) => {
      setLoadingState('signIn', true);
      try {
        const { accessToken, refreshToken } = await authService.signIn(
          username,
          password
        );
        cookieService.setAccessTokenCookie(accessToken);
        cookieService.setRefreshTokenCookie(refreshToken);
        cookieService.setUsernameCookie(username);
        apiService.setAuthentication(accessToken);
        notificationService.success(t('auth.signInSuccess'));
        navigate('/about');
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.signIn')}: ${error}`
          );
        }
      } finally {
        setLoadingState('signIn', false);
      }
    },
    [setLoadingState, navigate, t]
  );

  const handleSignUp = useCallback(
    async (username: string, password: string) => {
      setLoadingState('signUp', true);
      try {
        await authService.signUp(username, password);
        notificationService.success(t('auth.confirmationSent'));
        notificationService.success(t('auth.signUpSuccess'));
        navigate('/auth/confirm-user');
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.signUp')}: ${error}`
          );
        }
      } finally {
        setLoadingState('signUp', false);
      }
    },
    [setLoadingState, navigate, t]
  );

  const handleConfirmUser = useCallback(
    async (username: string, code: string) => {
      setLoadingState('confirmUser', true);
      try {
        const response = await authService.confirmUser(username, code);
        notificationService.success(response.message);
        navigate('/auth/sign-in');
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.signIn')}: ${error}`
          );
        }
      } finally {
        setLoadingState('confirmUser', false);
      }
    },
    [setLoadingState, navigate, t]
  );

  const handleSignOut = useCallback(() => {
    cookieService.removeAll();
    notificationService.success(t('auth.signOutSuccess'));
  }, [t]);

  const handleForgotPassword = useCallback(
    async (username: string) => {
      setLoadingState('forgotPassword', true);
      try {
        const response = await authService.forgotPassword(username);
        notificationService.success(response.message);
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.password')}: ${error}`
          );
        }
      } finally {
        setLoadingState('forgotPassword', false);
      }
    },
    [setLoadingState, t]
  );

  const handleConfirmPassword = useCallback(
    async (username: string, newPassword: string, code: string) => {
      setLoadingState('confirmPassword', true);
      try {
        const response = await authService.confirmPassword(
          username,
          newPassword,
          code
        );
        notificationService.success(response.message);
        navigate('/auth/sign-in');
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.password')}: ${error}`
          );
        }
      } finally {
        setLoadingState('confirmPassword', false);
      }
    },
    [setLoadingState, navigate, t]
  );

  const handleResendConfirmationCode = useCallback(
    async (username: string) => {
      setLoadingState('resendConfirmationCode', true);
      try {
        const response = await authService.resendConfirmationCode(username);
        notificationService.success(response.message);
        navigate('/auth/confirm-user');
      } catch (error: unknown) {
        if (error instanceof Error) {
          notificationService.error(error.message);
        } else {
          notificationService.error(
            `${t('auth.unknownError.password')}: ${error}`
          );
        }
      } finally {
        setLoadingState('resendConfirmationCode', false);
      }
    },
    [setLoadingState, navigate, t]
  );

  const handleRefreshSession = useCallback(() => {
    async function refreshSession() {
      setLoadingState('refreshSession', true);
      try {
        const username = cookieService.getCookie(StoredCookies.USERNAME) || '';
        const accessToken =
          cookieService.getCookie(StoredCookies.ACCESS_TOKEN) || '';
        const refreshToken =
          cookieService.getCookie(StoredCookies.REFRESH_TOKEN) || '';
        if (!username || !refreshToken) {
          throw new Error(t('auth.sessionExpiredError'));
        }

        if (!accessToken) {
          const response = await authService.refreshToken(
            username,
            refreshToken
          );
          cookieService.setAccessTokenCookie(response.accessToken);
          apiService.setAuthentication(response.accessToken);
        }
        setLoadingState('refreshSession', false);
      } catch (error) {
        navigate('auth/sign-in');
        if (error instanceof Error) notificationService.error(error.message);
        else notificationService.error(t('auth.unknownError.refresh'));
      }
    }
    return refreshSession();
  }, [setLoadingState, navigate, t]);

  const contextValue = {
    loadingState,
    handleConfirmPassword,
    handleConfirmUser,
    handleForgotPassword,
    handleRefreshSession,
    handleResendConfirmationCode,
    handleSignIn,
    handleSignOut,
    handleSignUp,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
