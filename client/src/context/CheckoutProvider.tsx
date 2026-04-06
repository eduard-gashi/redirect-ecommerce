import { useState, ReactNode } from 'react';
import type { Product } from '../types/data-types';
import { CheckoutContext } from './CheckoutContext';
import CheckoutOverlay from '../components/checkout/CheckoutOverlay';

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
        <CheckoutOverlay product={activeProduct} quantity={quantity} onClose={closeCheckout} />
      )}
    </CheckoutContext.Provider>
  );
}
