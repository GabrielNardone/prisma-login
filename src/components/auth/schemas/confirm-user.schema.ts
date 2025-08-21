import * as yup from 'yup';

import i18n from '@/i18n';

const ONLY_NUMBERS_REGEX = /^\d+$/;

export const getConfirmUserSchema = () =>
  yup.object({
    username: yup
      .string()
      .email(i18n.t('auth.validation.usernameInvalid'))
      .required(i18n.t('auth.validation.usernameRequired')),
    code: yup
      .string()
      .matches(ONLY_NUMBERS_REGEX, i18n.t('auth.validation.codeType'))
      .min(6, i18n.t('auth.validation.codeMinLength'))
      .required(i18n.t('auth.validation.codeRequired')),
  });
