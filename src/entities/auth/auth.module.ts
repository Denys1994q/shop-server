import {Module} from '@nestjs/common';
import {AuthController} from './controller/auth.controller';
import {AuthService} from './service/auth.service';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '24h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
