import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './entities/user/user.module';
import {AuthModule} from './entities/auth/auth.module';
import {ProductModule} from './entities/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    UserModule,
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
