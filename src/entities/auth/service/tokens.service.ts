import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {DecodedToken, Tokens} from '@app/types/tokens.type';
import * as bcrypt from 'bcrypt';
import {UserService} from '@app/entities/user/service/user.service';
import {accessTokenExpiration, refreshTokenExpiration} from '@app/constants/tokensExpiration.constant';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  public extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async verifyToken(token: string, secretKey: string): Promise<DecodedToken | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {secret: secretKey});
      return decoded;
    } catch {
      return null;
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException();
    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException();
    }
    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userId: string): Promise<Tokens> {
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({sub: userId}, {secret: accessSecret, expiresIn: accessTokenExpiration}),
      this.jwtService.signAsync({sub: userId}, {secret: refreshSecret, expiresIn: refreshTokenExpiration})
    ]);

    return {accessToken, refreshToken};
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const saltOrRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken
    });
  }
}
