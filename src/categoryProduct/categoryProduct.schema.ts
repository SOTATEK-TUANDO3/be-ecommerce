import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../category/category.schema';
import { Product } from '../products/product.schema';

export type UserDocument = CategoryProduct & Document;

@Schema()
export class CategoryProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: Product;
}

export const CategoryProductSchema =
  SchemaFactory.createForClass(CategoryProduct);
