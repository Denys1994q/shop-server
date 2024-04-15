import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {UserDocument} from '../model/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {statusMessages} from '@app/constants/errorMessages.constant';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {CreateUserDto} from '../dto/createUserDto';

export type UserWithoutPasswordHash = Omit<UserDocument, 'passwordHash'>;

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(userData: CreateUserDto): Promise<{user: UserWithoutPasswordHash; token: string}> {
    const {firstName, lastName, email, phoneNumber, password} = userData;
    const existingUser = await this.userModel.findOne({email: email});
    if (existingUser) {
      throw new HttpException(statusMessages.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      passwordHash: hash
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    const {passwordHash, ...data} = savedUser.toJSON();

    return {user: data, token};
  }
}
