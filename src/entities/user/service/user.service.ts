import {Injectable} from '@nestjs/common';
import {UserDocument} from '../model/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../dto/createUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({email: email});
  }

  async createUser(userData: CreateUserDto): Promise<UserDocument> {
    const {firstName, lastName, email, phoneNumber, password} = userData;
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
    return savedUser;
  }
}
