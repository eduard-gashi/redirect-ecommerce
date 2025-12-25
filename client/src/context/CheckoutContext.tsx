import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";
import type { Product } from "../types/data-types";
import CheckoutOverlay from "../components/CheckoutOverlay";

type CheckoutContextValue = {
  openCheckout: (product: Product, quantity?: number) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openCheckout = (product: Product, q = 1) => {
    setActiveProduct(product);
    setQuantity(q);
  };

  const closeCheckout = () => {
    setActiveProduct(null);
  };

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}

      {activeProduct && (
        <CheckoutOverlay
          product={activeProduct}
          quantity={quantity}
          onClose={closeCheckout}
        />
      )}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx)
    throw new Error("useCheckout must be used within a CheckoutProvider");
  return ctx;
}
