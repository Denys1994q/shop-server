import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';

export const createProductSchema = yup.object().shape({
  title: yup.string().required(validationErrors.FIELD_REQUIRED),
  categoryId: yup.number().required(validationErrors.FIELD_REQUIRED),
  subcategoryId: yup.number().required(validationErrors.FIELD_REQUIRED),
  description: yup.string().required(validationErrors.FIELD_REQUIRED),
  detailedDescription: yup.array().of(
    yup.object().shape({
      label: yup.string().required(validationErrors.FIELD_REQUIRED),
      value: yup.string().required(validationErrors.FIELD_REQUIRED)
    })
  ),
  images: yup.array().of(yup.string()).required(validationErrors.FIELD_REQUIRED),
  price: yup.number().required(validationErrors.FIELD_REQUIRED),
  quantity: yup.number().required(validationErrors.FIELD_REQUIRED),
  discount: yup.number().default(0),
  seller: yup.number().required(validationErrors.FIELD_REQUIRED),
  brand: yup.string().required(validationErrors.FIELD_REQUIRED),
  state: yup.number().required(validationErrors.FIELD_REQUIRED),
  rating: yup.number().default(0)
});
