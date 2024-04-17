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
      throw new HttpException(statusMessages.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    const savedUser = await this.userService.createUser(userData);
    const payload = {sub: savedUser._id};

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
