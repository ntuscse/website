import React, { useEffect, useReducer, useMemo, useContext } from "react";
import { CartState, CartItem } from "types/lib/merch";

type ContextType = {
  state: CartState;
  dispatch: React.Dispatch<any>;
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
  items: [],
  voucher: "",
  name: "",
  billingEmail: "",
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartActionType.RESET_CART: {
      return JSON.parse(JSON.stringify(initState));
    }
    case CartActionType.INITALIZE: {
      return { ...state, ...action.payload };
    }
    case CartActionType.ADD_ITEM: {
      // Find if there's an existing item already:
      const { productId, size, colorway, quantity } = action.payload;
      const idx = state.items.findIndex(
        (x) =>
          x.productId === productId && x.size === size && x.colorway == colorway
      );
      const newQuantity = Math.min(
        (state?.items[idx]?.quantity ?? 0) + quantity,
        99
      );
      return {
        ...state,
        items:
          idx === -1
            ? [...state.items, action.payload]
            : [
                ...state.items.slice(0, idx),
                { ...state.items[idx], quantity: newQuantity },
                ...state.items.slice(idx + 1),
              ],
      };
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { productId, size, colorway, quantity } = action.payload;
      const idx = state.items.findIndex(
        (x) =>
          x.productId === productId && x.size === size && x.colorway == colorway
      );
      return {
        ...state,
        items:
          idx === -1
            ? [...state.items]
            : [
                ...state.items.slice(0, idx),
                { ...state.items[idx], quantity },
                ...state.items.slice(idx + 1),
              ],
      };
    }
    case CartActionType.REMOVE_ITEM: {
      const { productId, size, colorway } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.filter(
            (x) =>
              !(
                x.productId === productId &&
                x.size === size &&
                x.colorway == colorway
              )
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

const initStorageCart: CartState = {
  voucher: "",
  name: "",
  billingEmail: "",
  items: [],
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    const cartState: CartState = JSON.parse(JSON.stringify(initState));
    const storedCartData: CartState =
      JSON.parse(localStorage.getItem("cart") as string) ?? initStorageCart;
    cartState.items = storedCartData.items;
    cartState.name = storedCartData.name;
    cartState.billingEmail = storedCartData.billingEmail;
    dispatch({ type: CartActionType.INITALIZE, payload: cartState });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
