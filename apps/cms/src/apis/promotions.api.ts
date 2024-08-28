import { Promotion } from "types";
import { PromoType } from "types";
// todo turn into real api
class PromotionsApi {
  async getPromotions(): Promise<Promotion[]> {
    const res: Promotion[] = [
      {
        promoCode: "MARCHSALES",
        maxRedemptions: 10,
        redemptionsRemaining: 10,
        discounts: {
          promoType: PromoType.FIXED_VALUE,
          promoValue: 5,
          appliesTo: ["1"],
          minimumQty: 1,
        },
      },
      {
        promoCode: "TSHIRTPROMO",
        maxRedemptions: 10,
        redemptionsRemaining: 10,
        discounts: {
          promoType: PromoType.FIXED_VALUE,
          promoValue: 5,
          appliesTo: ["1"],
          minimumQty: 1,
        },
      },
    ];

    return Promise.resolve(res);
  }
}

export default new PromotionsApi();
