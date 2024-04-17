import {Injectable} from '@nestjs/common';
import {UserDocument} from '../model/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateUserDto} from '../dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({email: email});
  }

  async createUser(userData: CreateUserDto): Promise<UserDocument> {
    const {firstName, lastName, email, phoneNumber, password} = userData;
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    });

    return await newUser.save();
  }

  async checkPassword(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId);
  }
}
