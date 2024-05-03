import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
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
  @Get()
  getProducts(): Promise<ProductDocument[]> {
    return this.productService.getAll();
  }

  @ApiOperation({summary: 'Add product', description: 'Create a new product'})
  @Post()
  @UsePipes(new YupValidationPipe(createProductSchema))
  createProduct(@Body() productData: CreateProductDto): Promise<ProductDocument> {
    return this.productService.createOne(productData);
  }

  @ApiOperation({summary: 'Get product', description: 'Get one product by id'})
  @Get(':id')
  getOneProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.getOne(id);
  }
}
