import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';
import {CategoriesEnum} from '@app/constants/categories.enum';
import {SubcategoriesEnum} from '@app/constants/subcategories.enum';
import {SellerEnum, StateEnum} from '@app/constants/product.enum';
import {validationConstants} from '@app/constants/validation.constant';
import {enumSchema} from '@app/utils/enumSchema';

const {MIN_LENGTH_TITLE, MIN_LENGTH_DESCRIPTION} = validationConstants;
const {FIELD_REQUIRED, INVALID_MIN_LENGTH} = validationErrors;

const descriptionItemSchema = yup.object().shape({
  label: yup.string().required(FIELD_REQUIRED),
  value: yup.string().required(FIELD_REQUIRED)
});

export const createProductSchema = yup.object().shape({
  title: yup.string().min(MIN_LENGTH_TITLE, INVALID_MIN_LENGTH(MIN_LENGTH_TITLE)).required(FIELD_REQUIRED),
  categoryId: enumSchema(CategoriesEnum).required(FIELD_REQUIRED),
  subcategoryId: enumSchema(SubcategoriesEnum).required(FIELD_REQUIRED),
  description: yup
    .string()
    .min(MIN_LENGTH_DESCRIPTION, INVALID_MIN_LENGTH(MIN_LENGTH_DESCRIPTION))
    .required(FIELD_REQUIRED),
  detailedDescription: yup.array().of(descriptionItemSchema),
  images: yup.array().of(yup.string()).required(FIELD_REQUIRED),
  price: yup.number().positive().required(FIELD_REQUIRED),
  quantity: yup.number().positive().required(FIELD_REQUIRED),
  discount: yup.number().positive().max(100),
  seller: enumSchema(SellerEnum).required(FIELD_REQUIRED),
  brand: yup.string().required(FIELD_REQUIRED),
  state: enumSchema(StateEnum).required(FIELD_REQUIRED)
});
