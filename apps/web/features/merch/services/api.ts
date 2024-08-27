import {
  APIError,
  Cart,
  CheckoutRequest,
  CheckoutResponse,
  MerchSaleStatus,
  PricedCart,
  Product,
  ProductsResponse,
  QuotationRequest,
} from "types";

export class Api {
  private API_ORIGIN: string;

  constructor() {
    if (!process.env.NEXT_PUBLIC_MERCH_API_ORIGIN) {
      throw new Error(
        "NEXT_PUBLIC_MERCH_API_ORIGIN environment variable is not set"
      );
    }
    this.API_ORIGIN = process.env.NEXT_PUBLIC_MERCH_API_ORIGIN;
  }

  // http methods
  async get<T extends Object>(urlPath: string): Promise<T> {
    const response = await fetch(`${this.API_ORIGIN}${urlPath}`);
    type responseType = T | APIError;
    const resp = (await response.json()) as responseType;
    if ("error" in resp) {
      console.error("Server error:", resp);
      throw new Error(`Error ${resp.error}`);
    }
    return resp;
  }

  async post<R, T extends Object>(urlPath: string, data: R): Promise<T> {
    const response = await fetch(`${this.API_ORIGIN}${urlPath}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    type responseType = T | APIError;
    const resp = (await response.json()) as responseType;
    if ("error" in resp) {
      console.error("Server error:", resp);
      throw new Error(`Error ${resp.error}`);
    }
    return resp;
  }

  async getProducts(): Promise<Product[]> {
    const res = await this.get<ProductsResponse>("/products");
    return res.products;
  }

  async getProduct(productId: string) {
    const res = await this.get(`/products/${productId}`);
    console.log("product res", res);
    return res;
  }

  async getOrder(orderID: string): Promise<Product> {
    if (!orderID) {
      throw new Error("No order ID");
    }
    const res = await this.get<Product>(`/orders/${orderID}`);
    return res;
  }

  async postCheckoutCart(
    cart: Cart,
    email: string,
    promoCode?: string
  ): Promise<CheckoutResponse> {
    return await this.post<CheckoutRequest, CheckoutResponse>(`/checkout`, {
      ...cart,
      promoCode: promoCode,
      email,
    });
  }

  async getMerchSaleStatus(): Promise<MerchSaleStatus> {
    // fetch merch status from backend, either true: enabled, false: disabled
    // Simulating fetching data from backend and admin panel
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          disabled: false,
          displayText:
            "We are currently preparing for the next merch sale. Please look forward to our email!",
        });
      }, 1000);
    });
  }
}

export const api = new Api();
