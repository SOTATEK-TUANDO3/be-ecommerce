import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentDto } from './dto/payment-dto';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async checkout(
    @Body() paymentDto: PaymentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripeService.checkout(paymentDto);
  }
}
