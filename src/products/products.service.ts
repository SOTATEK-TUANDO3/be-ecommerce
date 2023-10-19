import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      this.productModel.create(createProductDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount < 1) {
      throw new NotFoundException(`Task with IdD "${id} not found!"`);
    }
  }

  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    const result = await this.productModel.updateOne(
      { _id: updateProductDto._id },
      updateProductDto,
    );

    if (result.modifiedCount < 1) {
      throw new NotFoundException(
        `Task with IdD "${updateProductDto._id} not found!"`,
      );
    }
  }
}
