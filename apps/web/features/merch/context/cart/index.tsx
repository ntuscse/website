import React, { useEffect, useReducer, useMemo, useContext } from "react";
import { CartState, CartItem } from "types/lib/merch";

type ContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null;

export enum CartActionType {
  RESET_CART = "RESET_CART",
  INITALIZE = "initialize",
  ADD_ITEM = "add_item",
  UPDATE_QUANTITY = "update_quantity",
  REMOVE_ITEM = "remove_item",
  VALID_VOUCHER = "valid_voucher",
  REMOVE_VOUCHER = "remove_voucher",
  UPDATE_NAME = "update_name",
  UPDATE_BILLING_EMAIL = "update_billing_email",
}

export type CartAction =
  | { type: CartActionType.RESET_CART }
  | { type: CartActionType.INITALIZE; payload: CartState }
  | { type: CartActionType.ADD_ITEM; payload: CartItem }
  | { type: CartActionType.UPDATE_QUANTITY; payload: CartItem }
  | {
      type: CartActionType.REMOVE_ITEM;
      payload: { productId: string; size: string; colorway: string };
    }
  | { type: CartActionType.VALID_VOUCHER; payload: string }
  | { type: CartActionType.REMOVE_VOUCHER; payload: null }
  | { type: CartActionType.UPDATE_NAME; payload: string }
  | { type: CartActionType.UPDATE_BILLING_EMAIL; payload: string };

const CartContext = React.createContext<ContextType>(null);

const initState: CartState = {
  cart: {
    items: [],
  },
  voucher: "",
  name: "",
  billingEmail: "",
};

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionType.RESET_CART: {
      return JSON.parse(JSON.stringify(initState)) as typeof initState;
    }
    case CartActionType.INITALIZE: {
      return { ...state, ...action.payload };
    }
    case CartActionType.ADD_ITEM: {
      // Find if there's an existing item already:
      const { id, size, color, quantity } = action.payload;
      const idx = state.cart.items.findIndex(
        (x) => x.id === id && x.size === size && x.color === color
      );
      const newQuantity = Math.min(
        (state?.cart?.items[idx]?.quantity ?? 0) + quantity,
        99
      );
      return {
        ...state,
        cart: {
          ...state,
          items:
            idx === -1
              ? [...state.cart.items, action.payload]
              : [
                  ...state.cart.items.slice(0, idx),
                  { ...state.cart.items[idx], quantity: newQuantity },
                  ...state.cart.items.slice(idx + 1),
                ],
        },
      };
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { id, size, color, quantity } = action.payload;
      const idx = state.cart.items.findIndex(
        (x) => x.id === id && x.size === size && x.color === color
      );
      return {
        ...state,
        items:
          idx === -1
            ? [...state.cart.items]
            : [
                ...state.cart.items.slice(0, idx),
                { ...state.cart.items[idx], quantity },
                ...state.cart.items.slice(idx + 1),
              ],
      };
    }
    case CartActionType.REMOVE_ITEM: {
      const { id, size, color } = action.payload;
      return {
        ...state,
        items: [
          ...state.cart.items.filter(
            (x) => !(x.id === id && x.size === size && x.color == color)
          ),
        ],
      };
    }

    case CartActionType.VALID_VOUCHER: {
      return { ...state, voucher: action.payload };
    }

    case CartActionType.REMOVE_VOUCHER: {
      return { ...state, voucher: "" };
    }

    case CartActionType.UPDATE_NAME: {
      return { ...state, name: action.payload };
    }

    case CartActionType.UPDATE_BILLING_EMAIL: {
      return { ...state, billingEmail: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
    }
  }
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCartStore must be used within a CartProvider.");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    const cartState: CartState = JSON.parse(
      JSON.stringify(initState)
    ) as typeof initState;
    const storedCartData: CartState =
      (JSON.parse(
        localStorage.getItem("cart") as string
      ) as typeof initState) ?? cartState;
    cartState.cart.items = storedCartData.cart.items;
    cartState.name = storedCartData.name;
    cartState.billingEmail = storedCartData.billingEmail;
    dispatch({ type: CartActionType.INITALIZE, payload: cartState });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
