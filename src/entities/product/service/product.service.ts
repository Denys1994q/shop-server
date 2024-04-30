import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ProductDocument} from '../model/product.schema';
import {Model} from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<ProductDocument>) {}

  async getAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }
}
