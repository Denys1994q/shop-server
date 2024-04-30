import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ProductDocument} from '../model/product.schema';
import {Model} from 'mongoose';
import {CreateProductDto} from '../dto/createProductDto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<ProductDocument>) {}

  async getAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async createOne(productData: CreateProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel({
      ...productData,
      quantity: 1
    });

    return await newProduct.save();
  }
}
