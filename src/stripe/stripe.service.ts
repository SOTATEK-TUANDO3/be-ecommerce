import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async checkout(
    amount: number,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const res = await this.stripe.paymentIntents.create({
      amount,
      currency: process.env.STRIPE_CURRENCY,
      payment_method_types: ['card'],
    });

    return res;
  }
}
