import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {isVerifiedToken, Tokens} from '@app/types/tokens.type';
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

  async verifyToken(token: string, secretKey: string): Promise<isVerifiedToken | null> {
    try {
      const isVerified = await this.jwtService.verifyAsync(token, {secret: secretKey});
      return isVerified;
    } catch {
      return null;
    }
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
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

  async removeRefreshToken(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    user.refreshToken = null;
    await user.save();
  }
}
