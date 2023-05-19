import { Cart, PricedCart, Product, Promotion } from "types";

export const calculatePricing = (
  products: Product[],
  cart: Cart,
  promotion?: Promotion
): PricedCart => {
  const productMap: Record<string, Product> = {};
  if (promotion && promotion.redemptionsRemaining <= 0) {
    throw new Error("no redemptions left for the provided promotion");
  }
  for (const product of products) {
    productMap[product.id] = product;
  }
  const pricedItems = cart.items.map((item) => {
    const product = productMap[item.id];
    if (!product) {
      throw new Error("unknown product ID: " + item.id);
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
        case FIXED_VALUE:
          itemPrice -= discount.promoValue;
          break;
        case PERCENTAGE:
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
