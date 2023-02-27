export interface Product {
  id: string;
  name: string;
  // todo
}

export interface Order {
  // todo
}

export interface Promotion {
  promoCode: string;
  discounts: Array<{
    promoType: PromoType;
    promoValue: number; // percent off or fixed value off based on promoType property
    appliesTo: Array<string>; // array of product ids
    minimumQty: number; // minimum quantity of items in the order to apply the discount
    maxRedemptions: number;
    redemptionsRemaining: number;
  }>;
}

enum PromoType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_VALUE = "FIXED_VALUE",
}
