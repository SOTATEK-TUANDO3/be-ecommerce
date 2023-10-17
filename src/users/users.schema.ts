import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum UserType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
    enum: [UserType.ADMIN, UserType.CUSTOMER],
  })
  role: string;

  @Prop({
    required: true,
  })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
