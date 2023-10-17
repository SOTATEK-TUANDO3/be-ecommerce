import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';
import { CategoryProduct } from '../categoryProduct/categoryProduct.schema';

export type UserDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
    default: [],
  })
  category: CategoryProduct[];

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    required: true,
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        ratinNumber: { type: Number },
      },
    ],
    default: [],
  })
  rating: [
    {
      user: User;
      ratingNumber: number;
    }[],
  ];

  @Prop({
    required: true,
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
      },
    ],
    default: [],
  })
  comments: [
    {
      user: User;
      comment: string;
    }[],
  ];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
