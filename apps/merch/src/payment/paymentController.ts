import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import {
  PaymentIntent,
  PaymentIntentParams,
  PaymentService,
} from "./paymentService";

@Route("payment")
export class PaymentController extends Controller {
  @SuccessResponse("201", "Created payment intent successfully")
  @Post()
  public async createPaymentIntent(
    @Body() requestBody: PaymentIntentParams
  ): Promise<PaymentIntent> {
    this.setStatus(201);
    return new PaymentService().create(requestBody);
  }
}
