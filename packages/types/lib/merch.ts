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
  items: {
    id: string;
    name: string;
    category: string;
    image?: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  transaction_id: string;
  transaction_time?: string;
  payment_method: string;
  customer_email: string;
  status: OrderStatus;
}

// Cart
export type CartState = {
  cart: Cart;
  voucher: string | null;
  name: string;
  billingEmail: string;
};

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  id: string;
  color: string;
  size: string;
  quantity: number;
}

// Promotion
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

export interface PricedCart {
  promoCode?: string;
  total: number;
  items: {
    id: string;
    color: string;
    size: string;
    quantity: number;
    originalPrice: number;
    discountedPrice: number;
  }[];
}

export enum PromoType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_VALUE = "FIXED_VALUE",
}

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

export type CartResponseDto = {
  items: [
    {
      id: string;
      name: string;
      price: number;
      images: string[];
      sizes: string;
      productCategory: string;
      isAvailable: boolean;
      quantity: number;
    }
  ];
  price: {
    currency: string;
    subtotal: number;
    discount: number;
    grandTotal: number;
  };
};

/*
export type CheckoutResponseDto = {
  orderId: string;
  items: [
    {
      id: string;
      name: string;
      price: number;
      images: string[];
      sizes: string[];
      productCategory: string;
      isAvailable: boolean;
      quantity: number;
    }
  ];
  price: {
    currency: string;
    subtotal: number;
    discount: number;
    grandTotal: number;
  };
  payment: {
    paymentGateway: string;
    clientSecret: string;
  };
  email: string;
};
*/