import * as yup from 'yup';

import {
  CODE_MIN_LENGTH,
  CODE_REQUIRED,
  CODE_TYPE,
  USERNAME_INVALID,
  USERNAME_REQUIRED,
} from './schema-errors';

const ONLY_NUMBERS_REGEX = /^\d+$/;

export const confirmUserSchema = yup.object({
  username: yup.string().email(USERNAME_INVALID).required(USERNAME_REQUIRED),
  code: yup
    .string()
    .matches(ONLY_NUMBERS_REGEX, CODE_TYPE)
    .min(6, CODE_MIN_LENGTH)
    .required(CODE_REQUIRED),
});
