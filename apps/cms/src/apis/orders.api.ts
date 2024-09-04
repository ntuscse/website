/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { Order } from "../@types/Order";

class OrdersApi {
  async getOrders(): Promise<Order[]> {
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/orders`);
    const orders = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return orders?.docs as Order[];
  }
}

export default new OrdersApi();
