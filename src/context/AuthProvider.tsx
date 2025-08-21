import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';

import { useLoadingState } from '@/hooks/auth/useAuthState';
import { useTranslation } from '@/hooks/translation/useTranslation';
import { StoredCookies } from '@/interfaces/auth/cookies.enum';
import { apiService } from '@/services/api.service';
import { authService } from '@/services/auth.service';
import { cookieService } from '@/services/cookie.service';
import { notificationService } from '@/services/notification.service';

type PropTypes = { children: React.ReactNode };
export const AuthProvider = ({ children }: PropTypes) => {
  const { loadingState, setLoadingState } = useLoadingState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = useCallback(
    (username: string, password: string) => {
      async function signIn(username: string, password: string) {
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
      }
      return signIn(username, password);
    },
    [setLoadingState, navigate, t]
  );

  const handleSignUp = useCallback(
    (username: string, password: string) => {
      async function signUp(username: string, password: string) {
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
              `${t('auth.unknownError.signUn')}: ${error}`
            );
          }
        } finally {
          setLoadingState('signUp', false);
        }
      }
      return signUp(username, password);
    },
    [setLoadingState, navigate, t]
  );

  const handleConfirmUser = useCallback(
    (username: string, code: string) => {
      async function confirmUser(username: string, code: string) {
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
      }
      return confirmUser(username, code);
    },
    [setLoadingState, navigate, t]
  );

  const handleSignOut = useCallback(() => {
    cookieService.removeAll();
    notificationService.success(t('auth.signOutSuccess'));
  }, [t]);

  const handleForgotPassword = useCallback(
    (username: string) => {
      async function forgotPassword(username: string) {
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
      }
      return forgotPassword(username);
    },
    [setLoadingState, t]
  );

  const handleConfirmPassword = useCallback(
    (username: string, newPassword: string, code: string) => {
      async function confirmPassword(
        username: string,
        newPassword: string,
        code: string
      ) {
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
      }
      return confirmPassword(username, newPassword, code);
    },
    [setLoadingState, navigate, t]
  );

  const handleResendConfirmationCode = useCallback(
    (username: string) => {
      async function resendConfirmationCode(username: string) {
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
      }
      return resendConfirmationCode(username);
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
          cookieService.setAccessTokenCookie(accessToken);
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
