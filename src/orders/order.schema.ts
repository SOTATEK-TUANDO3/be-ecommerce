import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Payment } from 'src/payment/payment.schema';
import { User } from 'src/users/users.schema';

export type OrderDocument = Order & Document;
export enum OrderStatus {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  })
  payment: Payment;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  city: string;

  @Prop({
    type: String,
    required: true,
  })
  streetAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  postalCode: string;

  @Prop({
    type: String,
    required: true,
  })
  country: string;

  @Prop({
    required: true,
    enum: [OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
