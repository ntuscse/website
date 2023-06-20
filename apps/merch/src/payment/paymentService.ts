export type PaymentIntentParams = {
  amount: number;
};

export type PaymentIntent = {
  clientSecret: string;
};

export class PaymentService {
  public create(paymentIntentParams: PaymentIntentParams): PaymentIntent {
    // todo: call stripe api
    return {
      clientSecret: "clientSecret",
    };
  }
}
