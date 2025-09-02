import * as yup from 'yup';

import i18n from '@/i18n';

export const getSignUpSchema = () =>
  yup.object({
    dniType: yup.string().required(i18n.t('auth.validation.dniTypeRequired')),
    dniNumber: yup.string().required(i18n.t('auth.validation.dniRequired')),
    gender: yup.string().required(i18n.t('auth.validation.genderRequired')),
    username: yup
      .string()
      .email(i18n.t('auth.validation.usernameInvalid'))
      .required(i18n.t('auth.validation.usernameRequired')),
    password: yup
      .string()
      .required(i18n.t('auth.validation.passwordRequired'))
      .min(8, i18n.t('auth.validation.passwordMinLength'))
      .max(50, i18n.t('auth.validation.passwordMaxLength'))
      .matches(/[a-z]/, i18n.t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, i18n.t('auth.validation.passwordUppercase'))
      .matches(/[0-9]/, i18n.t('auth.validation.passwordNumber'))
      .matches(/\W/, i18n.t('auth.validation.passwordSpecial')),
    confirmPassword: yup
      .string()
      .required(i18n.t('auth.validation.passwordRequired'))
      .oneOf([yup.ref('password')], i18n.t('auth.validation.confirmPassword')),
  });
