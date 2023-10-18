import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
