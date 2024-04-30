import {ApiProperty} from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({required: true})
  title: string;

  @ApiProperty({required: true})
  categoryId: number;

  @ApiProperty({required: true})
  subcategoryId: number;

  @ApiProperty({required: true})
  description: string;

  @ApiProperty({required: false})
  detailedDescription: {label: string; value: string}[];

  @ApiProperty({required: true, type: [String]})
  images: string[];

  @ApiProperty({required: true})
  price: number;

  @ApiProperty({required: true})
  quantity: number;

  @ApiProperty({required: true, default: 0})
  discount: number;

  @ApiProperty({required: true})
  seller: number;

  @ApiProperty({required: true})
  brand: string;

  @ApiProperty({required: true})
  state: number;

  @ApiProperty({required: true, default: 0})
  rating: number;
}
