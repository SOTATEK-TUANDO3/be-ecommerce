import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Payment } from '../payment/payment.schema';
import { User } from '../users/users.schema';

export type UserDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  })
  paymentId: Payment;

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
    type: String,
    required: true,
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
