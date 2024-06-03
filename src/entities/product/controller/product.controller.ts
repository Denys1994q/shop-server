import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ProductService} from '../service/product.service';
import {ApiOperation} from '@nestjs/swagger';
import {ProductDocument} from '../model/product.schema';
import {ProductDto} from '../dto/productDto';
import {YupValidationPipe} from '@app/pipes/YupValidationPipe';
import {productSchema} from '../validation/productValidation.schema';
import {idSchema} from '@app/validation/validateIdSchema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({summary: 'Get products', description: 'Get list of all products'})
  getProducts(
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('minRating') minRating: number,
    @Query('maxRating') maxRating: number,
    @Query('categories') categories: string,
    @Query('brands') brands: string,
    @Query('sort') sort: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number
  ): Promise<{products: ProductDocument[]; total: number; pages: number}> {
    return this.productService.getAll(
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      categories,
      brands,
      sort,
      pageSize,
      page
    );
  }

  @Post()
  @ApiOperation({summary: 'Add product', description: 'Create a new product'})
  createProduct(@Body(new YupValidationPipe(productSchema)) productData: ProductDto): Promise<ProductDocument> {
    return this.productService.createOne(productData);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get product', description: 'Get one product by id'})
  getOneProduct(@Param('id', new YupValidationPipe(idSchema)) id: string): Promise<ProductDocument> {
    return this.productService.getOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update product', description: 'Update one product'})
  updateProduct(
    @Param('id', new YupValidationPipe(idSchema)) id: string,
    @Body(new YupValidationPipe(productSchema)) productData: ProductDto
  ): Promise<string> {
    return this.productService.updateOne(id, productData);
  }
}
