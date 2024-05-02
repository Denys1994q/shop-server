import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';

export function enumSchema<T>(enumObject: Record<string, T>): yup.NumberSchema {
  return yup.number().oneOf(
    Object.values(enumObject).map((value) => value as number),
    validationErrors.INVALID_VALUE
  );
}
