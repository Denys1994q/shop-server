import * as yup from 'yup';

export const idSchema = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');