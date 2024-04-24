import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';

export const signInUserSchema = yup.object().shape({
  email: yup.string().email(validationErrors.INVALID_VALUE).required(validationErrors.FIELD_REQUIRED),
  password: yup.string().required(validationErrors.FIELD_REQUIRED)
});
