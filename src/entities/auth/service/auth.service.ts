import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from '@app/entities/user/service/user.service';
import {CreateUserDto} from '@app/entities/user/dto/createUserDto';
import {statusMessages} from '@app/constants/errorMessages.constant';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(userData: CreateUserDto): Promise<{access_token: string}> {
    const {email} = userData;
    const user = await this.userService.findOne(email);
    if (user) {
      throw new HttpException(statusMessages.USER_ALREADY_EXISTS(email), HttpStatus.CONFLICT);
    }
    const savedUser = await this.userService.createUser(userData);
    const payload = {sub: savedUser._id};

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signIn(email: string, password: string): Promise<{access_token: string}> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException(statusMessages.USER_NOT_FOUND(email), HttpStatus.NOT_FOUND);
    }
    const isValidPass = await this.userService.checkPassword(password, user.password);
    if (!isValidPass) {
      throw new HttpException(statusMessages.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    const payload = {sub: user._id};

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
