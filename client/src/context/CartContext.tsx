import { createContext, useContext } from 'react';
import type { Product } from '../types/data-types';

export type CartItem = Product & { quantity: number };

export type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, newQuantity: number) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
