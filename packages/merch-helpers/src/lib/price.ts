import { Cart, PricedCart, Product, Promotion, PromoType } from "types";

const frontendURL = process.env.FRONTEND_STAGING_DOMAIN || "";

export class PricingError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const describeCart = (products: Product[], cart: PricedCart, orderID: string): string => {
  const entries = [`${frontendURL}/orders/${orderID} | `];

  const productMap: Record<string, Product> = {};
  for (const product of products) {
    productMap[product.id] = product;
  }

  for (const item of cart.items) {
    const product = productMap[item.id];
    if (!product) {
      throw new PricingError("unknown product ID: " + item.id);
    }
    let name = product.name;
    if (item.size) {
      name = `${product.name} (Size: ${item.size.toUpperCase()})`;
    }
    entries.push(`${name} x${item.quantity} - S$${item.discountedPrice}`);
  }

  return entries.join("\n");
}

export const calculatePricing = (
  products: Product[],
  cart: Cart,
  promotion?: Promotion
): PricedCart => {
  const productMap: Record<string, Product> = {};
  if (promotion && promotion.redemptionsRemaining <= 0) {
    throw new PricingError("no redemptions left for the provided promotion");
  }
  for (const product of products) {
    productMap[product.id] = product;
  }
  const pricedItems = cart.items.map((item) => {
    const product = productMap[item.id];
    if (!product) {
      throw new PricingError("unknown product ID: " + item.id);
    }
    if (!product.colors.includes(item.color)) {
      throw new PricingError(`invalid color ${item.color} for product ${item.id}`);
    }
    if (!product.sizes.includes(item.size)) {
      throw new PricingError(`invalid size ${item.color} for product ${item.id}`);
    }
    let itemPrice = product.price * item.quantity;
    if (!promotion) {
      return {
        ...item,
        originalPrice: product.price,
        discountedPrice: product.price,
      };
    }
    for (const discount of promotion.discounts) {
      if (discount.appliesTo && !discount.appliesTo.includes(item.id)) {
        continue;
      }
      if (discount.minimumQty && item.quantity < discount.minimumQty) {
        continue;
      }
      switch (discount.promoType) {
        case PromoType.FIXED_VALUE:
          itemPrice -= discount.promoValue;
          break;
        case PromoType.PERCENTAGE:
          itemPrice *= 1 - discount.promoValue;
          itemPrice = Math.floor(itemPrice);
          break;
      }
    }
    itemPrice = Math.max(0, itemPrice);
    return {
      ...item,
      originalPrice: product.price,
      discountedPrice: itemPrice,
    };
  });
  return {
    promoCode: promotion?.promoCode,
    total: pricedItems.reduce((acc, item) => acc + item.discountedPrice, 0),
    items: pricedItems,
  };
};
