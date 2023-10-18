import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/category.schema';
import { Product } from 'src/products/product.schema';

export type UserDocument = CategoryProduct & Document;

@Schema()
export class CategoryProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: Product;
}

export const CategoryProductSchema =
  SchemaFactory.createForClass(CategoryProduct);
