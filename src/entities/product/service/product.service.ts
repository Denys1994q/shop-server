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

  async getAll(
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    categories,
    brands,
    sort,
    pageSize = 5,
    page = 1
  ): Promise<{products: ProductDocument[]; total: number; pages: number; countByCategory: any}> {
    const query: any = {};
    if (minPrice !== undefined && maxPrice !== undefined)
      query.price = {$gte: Number(minPrice), $lte: Number(maxPrice)};
    if (minRating !== undefined && maxRating !== undefined)
      query.rating = {$gte: Number(minRating), $lte: Number(maxRating)};
    if (categories && categories.length > 0) {
      const categoriesArray: number[] = categories ? categories.split(',').map(Number) : [];
      query.categoryId = {$in: categoriesArray};
    }
    if (brands && brands.length > 0) {
      const brandsArray: number[] = brands ? brands.split(',').map(Number) : [];
      query.brand = {$in: brandsArray};
    }

    // const skip = (page - 1) * pageSize;
    // console.log('skip', skip);
    // console.log('pageSize', pageSize);
    let skip = (page - 1) * pageSize;
    if (page > 1) {
      // Якщо користувач не на першій сторінці, змінюємо значення skip
      skip -= pageSize - 5; // Віднімаємо з розміру сторінки (pageSize) кількість товарів, які вже були показані на поточній сторінці
    }
    if (sort !== undefined) {
      let sortObject = {};
      if (sort === '1') {
        sortObject = {price: 1};
      } else if (sort === '-1') {
        sortObject = {price: -1};
      }
      const countByCategoryPipeline: any = [
        {$match: query},
        {$group: {_id: '$categoryId', totalProducts: {$sum: 1}}},
        {$sort: {totalProducts: -1}}
      ];
      const countByCategory = await this.productModel.aggregate(countByCategoryPipeline).exec();

      const foundProducs = await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
      const totalProducts = await this.productModel.countDocuments(query);
      // return await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
      return {
        products: foundProducs,
        total: totalProducts,
        pages: Math.ceil(totalProducts / 5),
        countByCategory
      };
    } else {
      const countByCategoryPipeline: any = [
        {$match: query},
        {$group: {_id: '$categoryId', totalProducts: {$sum: 1}}},
        {$sort: {totalProducts: -1}}
      ];
      const countByCategory = await this.productModel.aggregate(countByCategoryPipeline).exec();

      const totalProducts = await this.productModel.countDocuments(query);
      const foundProducs = await this.productModel.find(query).skip(skip).limit(pageSize);
      return {
        products: foundProducs,
        total: totalProducts,
        pages: Math.ceil(totalProducts / 5),
        countByCategory
      };
    }
  }

  // async getAll(
  //   minPrice,
  //   maxPrice,
  //   minRating,
  //   maxRating,
  //   categories,
  //   brands,
  //   sort,
  //   page = 1
  // ): Promise<{products: ProductDocument[]; total: number; pages: number; countByCategory: any}> {
  //   const query: any = {};
  //   if (minPrice !== undefined && maxPrice !== undefined)
  //     query.price = {$gte: Number(minPrice), $lte: Number(maxPrice)};
  //   if (minRating !== undefined && maxRating !== undefined)
  //     query.rating = {$gte: Number(minRating), $lte: Number(maxRating)};
  //   if (categories && categories.length > 0) {
  //     const categoriesArray: number[] = categories ? categories.split(',').map(Number) : [];
  //     query.categoryId = {$in: categoriesArray};
  //   }
  //   if (brands && brands.length > 0) {
  //     const brandsArray: number[] = brands ? brands.split(',').map(Number) : [];
  //     query.brand = {$in: brandsArray};
  //   }
  //   const pageSize = 5;
  //   const skip = (page - 1) * pageSize;
  //   if (sort !== undefined) {
  //     let sortObject = {};
  //     if (sort === '1') {
  //       sortObject = {price: 1};
  //     } else if (sort === '-1') {
  //       sortObject = {price: -1};
  //     }
  //     const countByCategoryPipeline: any = [
  //       {$match: query},
  //       {$group: {_id: '$categoryId', totalProducts: {$sum: 1}}},
  //       {$sort: {totalProducts: -1}}
  //     ];
  //     const countByCategory = await this.productModel.aggregate(countByCategoryPipeline).exec();

  //     const foundProducs = await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
  //     const totalProducts = await this.productModel.countDocuments(query);
  //     // return await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
  //     return {
  //       products: foundProducs,
  //       total: totalProducts,
  //       pages: Math.ceil(totalProducts / 5),
  //       countByCategory
  //     };
  //   } else {
  //     const countByCategoryPipeline: any = [
  //       {$match: query},
  //       {$group: {_id: '$categoryId', totalProducts: {$sum: 1}}},
  //       {$sort: {totalProducts: -1}}
  //     ];
  //     const countByCategory = await this.productModel.aggregate(countByCategoryPipeline).exec();

  //     const totalProducts = await this.productModel.countDocuments(query);
  //     const foundProducs = await this.productModel.find(query).skip(skip).limit(pageSize);
  //     return {
  //       products: foundProducs,
  //       total: totalProducts,
  //       pages: Math.ceil(totalProducts / 5),
  //       countByCategory
  //     };
  //   }
  // }

  // constant for page
  // async getAll(
  //   minPrice,
  //   maxPrice,
  //   minRating,
  //   maxRating,
  //   categories,
  //   brands,
  //   sort,
  //   page = 1
  // ): Promise<{products: ProductDocument[]; total: number; pages: number}> {
  //   const query: any = {};
  //   if (minPrice !== undefined && maxPrice !== undefined) query.price = {$gte: minPrice, $lte: maxPrice};
  //   if (minRating !== undefined && maxRating !== undefined) query.rating = {$gte: minRating, $lte: maxRating};
  //   if (categories && categories.length > 0) {
  //     const categoriesArray: number[] = categories ? categories.split(',').map(Number) : [];
  //     query.categoryId = {$in: categoriesArray};
  //   }
  //   if (brands && brands.length > 0) {
  //     const brandsArray: number[] = brands ? brands.split(',').map(Number) : [];
  //     query.brand = {$in: brandsArray};
  //   }
  //   const pageSize = 5;
  //   const skip = (page - 1) * pageSize;
  //   if (sort !== undefined) {
  //     let sortObject = {};
  //     if (sort === '1') {
  //       sortObject = {price: 1};
  //     } else if (sort === '-1') {
  //       sortObject = {price: -1};
  //     }
  //     const foundProducs = await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
  //     const totalProducts = await this.productModel.countDocuments(query);
  //     // return await this.productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);
  //     return {
  //       products: foundProducs,
  //       total: totalProducts,
  //       pages: Math.ceil(totalProducts / 5)
  //     };
  //   } else {
  //     console.log('query', query);
  //     const countByCategoryPipeline: any = [
  //       {$match: query},
  //       {$group: {_id: '$categoryId', totalProducts: {$sum: 1}}},
  //       {$sort: {totalProducts: -1}}
  //     ];
  //     const countByCategory = await this.productModel.aggregate(countByCategoryPipeline).exec();
  //     console.log(countByCategory);

  //     const totalProducts = await this.productModel.countDocuments(query);
  //     const foundProducs = await this.productModel.find(query).skip(skip).limit(pageSize);
  //     return {
  //       products: foundProducs,
  //       total: totalProducts,
  //       pages: Math.ceil(totalProducts / 5)
  //     };
  //   }
  // }

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
