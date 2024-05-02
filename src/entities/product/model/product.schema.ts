import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {RatingEnum, StateEnum, SellerEnum} from '@app/constants/product.enum';
import {CategoriesEnum} from '@app/constants/categories.enum';
import {SubcategoriesEnum} from '@app/constants/subcategories.enum';

export type ProductDocument = HydratedDocument<Product>;

interface DescriptionItem {
  label: string;
  value: string;
}

@Schema()
export class Product {
  @Prop({required: true})
  title: string;

  @Prop({required: true, enum: CategoriesEnum})
  categoryId: number;

  @Prop({required: true, enum: SubcategoriesEnum})
  subcategoryId: number;

  @Prop({required: true})
  description: string;

  @Prop({required: false})
  detailedDescription: DescriptionItem[];

  @Prop({required: true})
  images: string[];

  @Prop({required: true, min: 0})
  price: number;

  @Prop({required: true, min: 0})
  quantity: number;

  @Prop({required: false, min: 0, max: 100})
  discount: number;

  @Prop({required: true, enum: SellerEnum})
  seller: number;

  @Prop({required: true})
  brand: string;

  @Prop({required: true, enum: StateEnum})
  state: number;

  @Prop({required: false, enum: RatingEnum, min: 0})
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
