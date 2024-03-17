import { PromoInfo } from "types";
// todo turn into real api
class OrdersApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getPromotions(): Promise<PromoInfo[]> {
    const res: PromoInfo[] = [];
    const item1: PromoInfo = {
      promotion_id: "1",
      name: "March Sales",
      discount_percentage: "10%",
      category: "T-shirts",
    };
    res.push(item1);

    const item2: PromoInfo = {
      promotion_id: "2",
      name: "Summer Sales",
      discount_percentage: "10%",
      category: "Tote bags",
    };
    res.push(item2);

    return res;
  }
}

export default new OrdersApi();
