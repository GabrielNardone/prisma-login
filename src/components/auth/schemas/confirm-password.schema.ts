import * as yup from 'yup';

import i18n from '@/i18n';

export const getConfirmPasswordSchema = () =>
  yup.object({
    username: yup
      .string()
      .email(i18n.t('auth.validation.usernameInvalid'))
      .required(i18n.t('auth.validation.usernameRequired')),
    code: yup
      .number()
      .typeError(i18n.t('auth.validation.codeType'))
      .test(
        'minLength',
        i18n.t('auth.validation.codeMinLength'),
        (val) => (val && val.toString().length >= 6) || false
      )
      .required(i18n.t('auth.validation.codeRequired')),
    password: yup
      .string()
      .min(8, i18n.t('auth.validation.passwordMinLength'))
      .max(50, i18n.t('auth.validation.passwordMaxLength'))
      .matches(/[a-z]/, i18n.t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, i18n.t('auth.validation.passwordUppercase'))
      .matches(/[0-9]/, i18n.t('auth.validation.passwordNumber'))
      .matches(/\W/, i18n.t('auth.validation.passwordSpecial'))
      .required(i18n.t('auth.validation.passwordRequired')),
  });
