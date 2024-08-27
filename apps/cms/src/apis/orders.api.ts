class OrdersApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getOrders(): Promise<any> {
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/orders`);
    const orders = await req.json();
    return orders.docs;
  }
}

export default new OrdersApi();
