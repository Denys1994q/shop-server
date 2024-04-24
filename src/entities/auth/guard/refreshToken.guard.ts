import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {TokensService} from '../service/tokens.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = this.tokensService.extractTokenFromHeader(request);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const secret = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
      const isVerified = await this.tokensService.verifyToken(refreshToken, secret);
      if (!isVerified) {
        throw new UnauthorizedException();
      }
      request.user = isVerified;
      request.refreshToken = refreshToken;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
