import { Product } from 'types'

export class Api {
  private API_ORIGIN: string;

  constructor() {
    if (!process.env.NEXT_PUBLIC_MERCH_API_ORIGIN) {
      throw new Error(
        "NEXT_PUBLIC_MERCH_API_ORIGIN environment variable is not set"
      );
    }
    this.API_ORIGIN = process.env.NEXT_PUBLIC_MERCH_API_ORIGIN || "";
  }

  // http methods
  async get(urlPath: string): Promise<Record<string, Product[]>> {
    const response = await fetch(`${this.API_ORIGIN}${urlPath}`);
    const convert = response.json() as unknown; // Convert to unknown type
    return convert as Record<string, Product[]>;
  }

  /*
  // eslint-disable-next-line class-methods-use-this
  async post(urlPath: string, data: any): Promise<any> {
    const response = await fetch(`${this.API_ORIGIN}${urlPath}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match
    });
    return response.json();
  }
  */

  // eslint-disable-next-line class-methods-use-this
  async getProducts(): Promise<Product[]> {
    try {
      const res = await this.get("/products");
      console.log("product-list", res);
      return res?.products ?? [];
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      return [];
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getProduct(productId: string) {
    try {
      const res = await this.get(`/products/${productId}`);
      console.log("product res", res);
      return res;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async getOrder(userId: string, orderId: string) {
    try {
      const res = await this.get(`/orders/${orderId}`);
      console.log("Order Summary response:", res);
      return res;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  /*
  async getOrder(userId: string, orderId: string) {
    try {
      const res = await this.get(`/orders/${orderId}`);
      console.log("Order Summary response:", res);
      return res;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getOrderHistory(userId: string) {
    try {
      const res = await this.get(`/orders/${userId}`);
      console.log("Order Summary response:", res);
      return res.json();
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async postCheckoutCart(
    items: CartItemType[],
    email: string,
    promoCode: string | null
  ) {
    try {
      const res = await this.post(`/cart/checkout`, {
        items,
        promoCode: promoCode ?? "",
        email,
      });
      return res;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async postQuotation(items: CartItemType[], promoCode: string | null) {
    try {
      const res = await this.post(`/cart/quotation`, {
        items,
        promoCode: promoCode ?? "",
      });
      return res;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  */
}

export const api = new Api();
