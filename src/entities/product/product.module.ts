import {MiddlewareConsumer, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductSchema} from './model/product.schema';
import {ProductController} from './controller/product.controller';
import {ProductService} from './service/product.service';
import {ValidateIdMiddleware} from '@app/middlewares/validateId.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: []
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateIdMiddleware).forRoutes('product/:id');
  }
}
