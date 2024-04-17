import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';
import {lowercaseRegex, uppercaseRegex, numbersRegex, symbolsRegex} from '@app/constants/validationRegex.constant';

export const signInUserSchema = yup.object().shape({
  email: yup.string().email(validationErrors.INVALID_VALUE).required(validationErrors.FIELD_REQUIRED),
  password: yup
    .string()
    .matches(lowercaseRegex, validationErrors.PASSWORD_INVALID_LOWERCASE_VALUE)
    .matches(uppercaseRegex, validationErrors.PASSWORD_INVALID_UPPERCASE_VALUE)
    .matches(numbersRegex, validationErrors.PASSWORD_INVALID_NUMBERS_VALUE)
    .matches(symbolsRegex, validationErrors.PASSWORD_INVALID_SYMBOLS_VALUE)
    .required(validationErrors.FIELD_REQUIRED)
});
