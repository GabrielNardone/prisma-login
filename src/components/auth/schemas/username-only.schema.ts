import * as yup from 'yup';

import i18n from '@/i18n';

export const getUsernameOnlySchema = () =>
  yup.object({
    username: yup
      .string()
      .email(i18n.t('auth.validation.usernameInvalid'))
      .required(i18n.t('auth.validation.usernameRequired')),
  });
