import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './model/user.schema';
import {UserService} from './service/user.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
