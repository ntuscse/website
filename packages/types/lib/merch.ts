export interface Product {
  id: string;
  name: string;
  colors: string[];
  sizes: string[];
  images: string[];
  is_available: boolean;
  price: number;
  category: string;
  size_chart?: string;
  stock: {
    [color: string]: {
      [size: string]: number;
    };
  };
}

export enum OrderStatus {
  PENDING_PAYMENT = 1,
  PAYMENT_COMPLETED = 2,
  ORDER_COMPLETED = 3,
}

export interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    category: string;
    image?: string;
    color: string;
    size: string;
    price: string;
    quantity: number;
  }[];
  transaction_id: string;
  transaction_time?: string;
  payment_method: string;
  customer_email: string;
  status: OrderStatus;
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
