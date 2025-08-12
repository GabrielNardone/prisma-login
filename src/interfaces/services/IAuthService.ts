import type { IRefreshSessionResponse } from '../auth/IRefreshSessionResponse';
import type { ISignInResponse } from '../auth/ISignInResponse';
import type { ISignUpResponse } from '../auth/ISignUpResponse';
import type { ISuccessfulAuthenticationResponse } from '../auth/ISuccessfulAuthenticationResponse';

import type { ApiRequestConfig } from '@/services/api.service';

export interface IAuthService {
  signUp: (
    username: string,
    password: string,
    config?: ApiRequestConfig
  ) => Promise<ISignUpResponse>;
  signIn: (
    username: string,
    password: string,
    config?: ApiRequestConfig
  ) => Promise<ISignInResponse>;
  confirmUser: (
    username: string,
    code: string,
    config?: ApiRequestConfig
  ) => Promise<ISuccessfulAuthenticationResponse>;
  confirmPassword: (
    username: string,
    newPassword: string,
    code: string,
    config?: ApiRequestConfig
  ) => Promise<ISuccessfulAuthenticationResponse>;
  resendConfirmationCode: (
    username: string,
    config?: ApiRequestConfig
  ) => Promise<ISuccessfulAuthenticationResponse>;
  forgotPassword: (
    username: string,
    config?: ApiRequestConfig
  ) => Promise<ISuccessfulAuthenticationResponse>;
  refreshToken: (
    username: string,
    refreshToken: string,
    config?: ApiRequestConfig
  ) => Promise<IRefreshSessionResponse>;
}
