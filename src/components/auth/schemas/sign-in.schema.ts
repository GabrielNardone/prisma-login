import * as yup from 'yup';

import i18n from '@/i18n';

export const getSignInSchema = () =>
  yup.object({
    username: yup
      .string()
      .email(i18n.t('auth.validation.usernameInvalid'))
      .required(i18n.t('auth.validation.usernameRequired')),
    password: yup.string().required(i18n.t('auth.validation.passwordRequired')),
  });
