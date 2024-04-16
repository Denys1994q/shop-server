import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {setPassword} from './userSchema.setters';

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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await setPassword(this.password);
  }
  next();
});
