import type { IRefreshSessionResponse } from './IRefreshSessionResponse';
import type { ISignInResponse } from './ISignInResponse';
import type { ISignUpResponse } from './ISignUpResponse';
import type { ISuccessfulAuthenticationResponse } from './ISuccessfulAuthenticationResponse';

export interface IAuthenticationService {
  signUp: (username: string, password: string) => Promise<ISignUpResponse>;
  signIn: (username: string, password: string) => Promise<ISignInResponse>;
  forgotPassword: (
    username: string
  ) => Promise<ISuccessfulAuthenticationResponse>;
  confirmPassword: (
    username: string,
    newPassword: string,
    code: string
  ) => Promise<ISuccessfulAuthenticationResponse>;
  confirmUser: (
    username: string,
    code: string
  ) => Promise<ISuccessfulAuthenticationResponse>;
  resendConfirmationCode: (
    username: string,
    code: string
  ) => Promise<ISuccessfulAuthenticationResponse>;
  refreshToken: (
    username: string,
    refreshToken: string
  ) => Promise<IRefreshSessionResponse>;
}
