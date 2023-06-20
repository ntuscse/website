import { Body, Controller, Post, Route, SuccessResponse, Response } from "tsoa";
import {
  PaymentIntent,
  PaymentIntentParams,
  PaymentService,
} from "./paymentService";

interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("payment")
export class PaymentController extends Controller {
  /**
   * Creates a stripe payment intent with the given amount.
   * Returns the payment intent's client secret.
   */
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @SuccessResponse("201", "Created payment intent successfully")
  @Post()
  public async createPaymentIntent(
    @Body() requestBody: PaymentIntentParams
  ): Promise<PaymentIntent> {
    this.setStatus(201);
    return new PaymentService().create(requestBody);
  }
}
