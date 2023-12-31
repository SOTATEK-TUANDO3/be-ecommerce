import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDto } from './dto/payment-dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async checkout(
    paymentDto: PaymentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const { products } = paymentDto;
    const amount = products.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );
    const res = await this.stripe.paymentIntents.create({
      amount,
      currency: process.env.STRIPE_CURRENCY,
      payment_method_types: ['card'],
    });

    return res;
  }
}
