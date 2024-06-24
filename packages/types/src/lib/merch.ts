import { z } from "zod";

// Product
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

// Order
export enum OrderStatus {
  PENDING_PAYMENT = 1,
  PAYMENT_COMPLETED = 2,
  ORDER_COMPLETED = 3,
}

export interface Order {
  id: string;
  items: OrderItem[];
  transaction_id: string;
  transaction_time: string | null;
  payment_method: string;
  customer_email: string;
  status: OrderStatus;
}

// Cart
export type CartState = {
  cart: Cart;
  voucher: string | undefined;
  name: string;
  billingEmail: string;
};

export const CartItem = z.object({
  id: z.string(),
  color: z.string(),
  size: z.string(),
  quantity: z.number().gt(0),
});

export const Cart = z.object({
  items: z.array(CartItem),
});

export type Cart = z.infer<typeof Cart>;
export type CartItem = z.infer<typeof CartItem>;

// Promotion
export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Promotion {
  promoCode: string;
  maxRedemptions: number;
  redemptionsRemaining: number;
  discounts: Array<{
    promoType: PromoType;
    promoValue: number; // percent off or fixed value off based on promoType property
    appliesTo?: Array<string>; // array of product ids
    minimumQty?: number; // minimum quantity of items in the order to apply the discount
  }>;
}

export interface PromoInfo {
  
  promotion_id: string;
  name: string;
  discount_percentage: string;
  category: string;
}

export type PricedCart = {
  promoCode?: string;
  subtotal: number;
  discount: number;
  total: number;
  items: {
    id: string;
    name: string;
    image?: string;
    color: string;
    size: string;
    quantity: number;
    originalPrice: number;
    discountedPrice: number;
  }[];
};

export enum PromoType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_VALUE = "FIXED_VALUE",
}

export type ReservedProduct = {
  id: string;
  quantity: number;
};

export type OrderHold = {
  transaction_id: string;
  expiry: string;
  reserved_products: ReservedProduct[];
};

export type ProductInfo = {
  name: string;
  image: string;
  price: number;
};

export type ProductInfoMap = Record<string, ProductInfo>;

export type CartPrice = {
  currency: string;
  subtotal: number;
  discount: number;
  grandTotal: number;
};

// API Types
export const QuotationRequest = Cart.merge(
  z.object({
    promoCode: z.string().optional(),
  })
);

export const CheckoutRequest = QuotationRequest.merge(
  z.object({
    email: z.string(),
  })
);

export type QuotationRequest = z.infer<typeof QuotationRequest>;
export type CheckoutRequest = z.infer<typeof CheckoutRequest>;

export type CheckoutResponse = Order & {
  expiry: string;
  price: {
    grandTotal: number;
    // todo: add rest of price object
  };
  payment: {
    method: "stripe";
    clientSecret: string;
  };
};

export type ProductsResponse = {
  products: Product[];
};

export type APIError = {
  error: string;
  detail?: string | object;
};

export type OrderHoldEntry = {
  // todo: ???
};

export type MerchSaleStatus = {
  disabled: boolean;
  displayText?: string;
};
