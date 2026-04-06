import { createContext, useContext } from 'react';
import type { Product } from '../types/data-types';

type CheckoutContextValue = {
  openCheckout: (product: Product, quantity?: number) => void;
};

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return ctx;
}
