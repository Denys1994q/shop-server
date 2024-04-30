import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';
import {CategoriesEnum} from '@app/constants/categories.enum';
import {SubcategoriesEnum} from '@app/constants/subcategories.enum';
import {SellerEnum, RatingEnum, StateEnum} from '@app/constants/product.enum';
import {validationConstants} from '@app/constants/validation.constant';

const {MIN_LENGTH_TITLE, MIN_LENGTH_DESCRIPTION} = validationConstants;
const {FIELD_REQUIRED, INVALID_VALUE, INVALID_MIN_LENGTH} = validationErrors;

export const createProductSchema = yup.object().shape({
  title: yup.string().min(MIN_LENGTH_TITLE, INVALID_MIN_LENGTH(MIN_LENGTH_TITLE)).required(FIELD_REQUIRED),
  categoryId: yup.number().oneOf(Object.values(CategoriesEnum), INVALID_VALUE).required(FIELD_REQUIRED),
  subcategoryId: yup.number().oneOf(Object.values(SubcategoriesEnum), INVALID_VALUE).required(FIELD_REQUIRED),
  description: yup
    .string()
    .min(MIN_LENGTH_DESCRIPTION, INVALID_MIN_LENGTH(MIN_LENGTH_DESCRIPTION))
    .required(FIELD_REQUIRED),
  detailedDescription: yup.array().of(
    yup.object().shape({
      label: yup.string().required(FIELD_REQUIRED),
      value: yup.string().required(FIELD_REQUIRED)
    })
  ),
  images: yup.array().of(yup.string()).required(FIELD_REQUIRED),
  price: yup.number().required(FIELD_REQUIRED),
  quantity: yup.number().required(FIELD_REQUIRED),
  discount: yup.number().default(0),
  seller: yup.number().oneOf(Object.values(SellerEnum), INVALID_VALUE).required(FIELD_REQUIRED),
  brand: yup.string().required(FIELD_REQUIRED),
  state: yup.number().oneOf(Object.values(StateEnum), INVALID_VALUE).required(FIELD_REQUIRED),
  rating: yup.number().oneOf(Object.values(RatingEnum), INVALID_VALUE).default(0)
});
