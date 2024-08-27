/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Order } from "../@types/Order";

class OrdersApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getOrders(): Promise<Order[]> {
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/orders`);
    const orders = await req.json();
    return orders?.docs as Order[];
  }
}

export default new OrdersApi();
