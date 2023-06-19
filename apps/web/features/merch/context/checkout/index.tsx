import React, { useContext, useMemo, useState } from "react";
import { CheckoutResponse } from "types";

type ContextType = {
  state: CheckoutResponse | null;
  setState: React.Dispatch<React.SetStateAction<CheckoutResponse | null>>;
} | null;

const CheckoutContext = React.createContext<ContextType>(null);

export const useCheckoutStore = () => {
  const context = useContext(CheckoutContext);
  if (context === null) {
    throw new Error("useCheckoutStore must be used within a CheckoutProvider.");
  }
  return context;
};

interface CheckoutProviderProps {
  children: React.ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutResponse | null>(
    null
  );

  const value = useMemo(
    () => ({
      state: checkoutState,
      setState: setCheckoutState,
    }),
    [checkoutState]
  );
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
