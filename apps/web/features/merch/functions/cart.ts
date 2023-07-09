import { CartItem } from "types/lib/merch";

export const getQtyInCart = (
  cartItems: CartItem[],
  id: string,
  color: string,
  size: string
): number => {
  const cartItem = cartItems.find((item) => {
    return item.id === id && item.size === size && item.color === color;
  });

  if (cartItem) {
    return cartItem.quantity;
  }
  return 0;
};

export const displayQtyInCart = (
  cartItems: CartItem[],
  id: string,
  color: string,
  size: string
): string => {
  const qty = getQtyInCart(cartItems, id, color, size);
  if (qty > 0) {
    return `You have already added ${qty} to your cart.`;
  }
  return "";
};
