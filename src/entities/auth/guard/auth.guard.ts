import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {TokensService} from '../service/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.tokensService.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      const isVerified = await this.tokensService.verifyToken(accessToken, secret);
      if (!isVerified) {
        throw new UnauthorizedException();
      }
      request['user'] = isVerified;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
