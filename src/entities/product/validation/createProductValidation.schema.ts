import * as yup from 'yup';
import {validationErrors} from '@app/constants/validationErrors.constant';
import {CategoriesEnum} from '@app/constants/categories.enum';
import {SubcategoriesEnum} from '@app/constants/subcategories.enum';
import {SellerEnum, StateEnum} from '@app/constants/product.enum';
import {validationConstants} from '@app/constants/validation.constant';

const {MIN_LENGTH_TITLE, MIN_LENGTH_DESCRIPTION} = validationConstants;
const {FIELD_REQUIRED, INVALID_VALUE, INVALID_MIN_LENGTH} = validationErrors;

const descriptionItemSchema = yup.object().shape({
  label: yup.string().required(FIELD_REQUIRED),
  value: yup.string().required(FIELD_REQUIRED)
});

export const createProductSchema = yup.object().shape({
  title: yup.string().min(MIN_LENGTH_TITLE, INVALID_MIN_LENGTH(MIN_LENGTH_TITLE)).required(FIELD_REQUIRED),
  categoryId: yup
    .mixed<CategoriesEnum>()
    .oneOf(Object.values(CategoriesEnum) as number[], INVALID_VALUE)
    .required(),
  subcategoryId: yup
    .mixed<SubcategoriesEnum>()
    .oneOf(Object.values(SubcategoriesEnum) as number[], INVALID_VALUE)
    .required(),
  description: yup
    .string()
    .min(MIN_LENGTH_DESCRIPTION, INVALID_MIN_LENGTH(MIN_LENGTH_DESCRIPTION))
    .required(FIELD_REQUIRED),
  detailedDescription: yup.array().of(descriptionItemSchema),
  images: yup.array().of(yup.string()).required(FIELD_REQUIRED),
  price: yup.number().required(FIELD_REQUIRED),
  quantity: yup.number().required(FIELD_REQUIRED),
  discount: yup.number(),
  seller: yup
    .mixed<SellerEnum>()
    .oneOf(Object.values(SellerEnum) as number[], INVALID_VALUE)
    .required(),
  brand: yup.string().required(FIELD_REQUIRED),
  state: yup
    .mixed<StateEnum>()
    .oneOf(Object.values(StateEnum) as number[], INVALID_VALUE)
    .required()
});
