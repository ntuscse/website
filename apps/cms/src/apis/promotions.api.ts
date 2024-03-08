import { IPromotion } from "../@types/IPromotion";

// todo turn into real api
class OrdersApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getPromotions(): Promise<IPromotion[]> {
    const res: IPromotion[] = [];
    const item1: IPromotion = {
      promotion_id: "1",
      name: "March Sales",
      discount_percentage: "10%",
      category: "T-shirts",
    };
    res.push(item1);

    const item2: IPromotion = {
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
