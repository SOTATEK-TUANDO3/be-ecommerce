import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/product.schema';
import { User } from 'src/users/users.schema';

export type UserDocument = WishProduct & Document;

@Schema()
export class WishProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: Product;
}

export const WishProductSchema = SchemaFactory.createForClass(WishProduct);
