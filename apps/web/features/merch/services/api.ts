import {
    APIError,
    Cart,
    CartResponseDto,
    CheckoutRequest,
    CheckoutResponse,
    PricedCart,
    Product,
    ProductsResponse,
    QuotationRequest
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

  async postCheckoutCart(cart: Cart, email: string, promoCode?: string) {
    return await this.post<CheckoutRequest, CheckoutResponse>(
      `/cart/checkout`,
      {
        ...cart,
        promoCode: promoCode,
        email,
      }
    );
  }

  async postQuotation(cart: Cart, promoCode: string | null) {
    return await this.post<QuotationRequest, CartResponseDto>(`/cart/quotation`, {
      ...cart,
      promoCode: promoCode ?? "",
    });
  }
}

export const api = new Api();
