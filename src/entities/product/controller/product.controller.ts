import {Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
import {ProductService} from '../service/product.service';
import {ApiOperation} from '@nestjs/swagger';
import {ProductDocument} from '../model/product.schema';
import {CreateProductDto} from '../dto/createProductDto';
import {YupValidationPipe} from '@app/pipes/YupValidationPipe';
import {createProductSchema} from '../validation/createProductValidation.schema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({summary: 'Get products', description: 'Get list of all products'})
  @Get('')
  getProduct(): Promise<ProductDocument[]> {
    return this.productService.getAll();
  }

  @ApiOperation({summary: 'Add product', description: 'Create a new product'})
  @Post('')
  @UsePipes(new YupValidationPipe(createProductSchema))
  createProduct(@Body() userData: CreateProductDto): Promise<ProductDocument> {
    return this.productService.createOne(userData);
  }
}
