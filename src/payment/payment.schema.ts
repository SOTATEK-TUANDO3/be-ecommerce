import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  status: boolean;

  // @Prop({
  //   type: String,
  //   required: true,
  // })
  // type: string;

  // @Prop({
  //   type: String,
  //   required: true,
  // })
  // gateWay: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
