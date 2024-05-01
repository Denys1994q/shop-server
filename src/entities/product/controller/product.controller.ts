import {Controller, Get} from '@nestjs/common';
import {ProductService} from '../service/product.service';
import {ApiOperation} from '@nestjs/swagger';
import {ProductDocument} from '../model/product.schema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({summary: 'Get products', description: 'Get list of all products'})
  @Get('')
  getProducts(): Promise<ProductDocument[]> {
    return this.productService.getAll();
  }
}
