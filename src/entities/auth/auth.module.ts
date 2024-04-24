import {Module} from '@nestjs/common';
import {AuthController} from './controller/auth.controller';
import {AuthService} from './service/auth.service';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';
import {TokensService} from './service/tokens.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService]
})
export class AuthModule {}
