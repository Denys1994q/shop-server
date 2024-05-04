import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ProductDocument} from '../model/product.schema';
import {Model} from 'mongoose';
import {ProductDto} from '../dto/productDto';
import {statusMessages} from '@app/constants/errorMessages.constant';
import {successMessages} from '@app/constants/successMessages.constant';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<ProductDocument>) {}

  async getAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async createOne(productData: ProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel({...productData});

    return await newProduct.save();
  }

  async getOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException(statusMessages.NOT_FOUND('Product'), HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async updateOne(id: string, productData: ProductDto): Promise<string> {
    await this.getOne(id);
    await this.productModel.updateOne({_id: id}, {...productData});

    return successMessages.SUCCESS;
  }
}
