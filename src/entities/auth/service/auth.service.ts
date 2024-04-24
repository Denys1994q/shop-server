import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from '@app/entities/user/service/user.service';
import {CreateUserDto} from '@app/entities/user/dto/createUserDto';
import {statusMessages} from '@app/constants/errorMessages.constant';
import {UserDocument} from '@app/entities/user/model/user.schema';
import {AuthorizedUser} from '@app/types/user.types';
import {Tokens} from '@app/types/tokens.type';
import {TokensService} from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokensService: TokensService
  ) {}

  async signUp(userData: CreateUserDto): Promise<Tokens> {
    const {email} = userData;
    const user = await this.userService.findOne(email);
    if (user) {
      throw new HttpException(statusMessages.USER_ALREADY_EXISTS(email), HttpStatus.CONFLICT);
    }
    const savedUser = await this.userService.createUser(userData);
    const tokens = await this.tokensService.getTokens(savedUser._id.toString());
    await this.tokensService.updateRefreshToken(savedUser._id.toString(), tokens.refreshToken);

    return tokens;
  }

  async signIn(email: string, password: string): Promise<Tokens> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException(statusMessages.USER_NOT_FOUND(email), HttpStatus.NOT_FOUND);
    }
    const isValidPass = await this.userService.checkPassword(password, user.password);
    if (!isValidPass) {
      throw new HttpException(statusMessages.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.tokensService.getTokens(user._id.toString());
    await this.tokensService.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    return tokens;
  }

  async getUser(userId: string): Promise<AuthorizedUser> {
    const user: UserDocument | null = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException(statusMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const {password, refreshToken, ...data} = user.toJSON();

    return data;
  }
}
