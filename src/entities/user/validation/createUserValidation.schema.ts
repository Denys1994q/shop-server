import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';

export const createUserSchema = yup.object().shape({
  firstName: yup.string().required(validationErrors.FIELD_REQUIRED),
  lastName: yup.string().required(validationErrors.FIELD_REQUIRED),
  email: yup.string().required(validationErrors.FIELD_REQUIRED).email(validationErrors.INVALID_VALUE),
  phoneNumber: yup.string().optional(),
  password: yup
    .string()
    .required(validationErrors.FIELD_REQUIRED)
    .matches(/[a-z].*[a-z]/, validationErrors.PASSWORD_INVALID_LOWERCASE_VALUE)
    .matches(/[A-Z].*[A-Z]/, validationErrors.PASSWORD_INVALID_UPPERCASE_VALUE)
    .matches(/[0-9].*[0-9]/, validationErrors.PASSWORD_INVALID_NUMBERS_VALUE)
    .matches(/[!@#$%^&*()_+\\[\]{};':"|,.<>?].*[!@#$%^&*()_+\\[\]{};':"|,.<>?]/, validationErrors.PASSWORD_INVALID_SYMBOLS_VALUE)
});
