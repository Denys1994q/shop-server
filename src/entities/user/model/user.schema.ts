import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {hashField} from './userSchema.setters';
import {ProductDocument} from '@app/entities/product/model/product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: false})
  phoneNumber?: string;

  @Prop()
  refreshToken: string;

  @Prop({type: [{product: {type: 'ObjectId', ref: 'Product'}, addedDate: {type: Date}}], default: []})
  wishlist: {product: ProductDocument['_id']; addedDate: Date}[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashField(this.password);
  }
  if (this.isModified('refreshToken') && this.refreshToken) {
    this.refreshToken = await hashField(this.refreshToken);
  }
  next();
});
