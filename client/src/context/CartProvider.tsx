import React, { useState, useEffect } from 'react';
import { CartContext, type CartItem } from './CartContext';
import type { Product } from '../types/data-types';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Cart updated:', cartItems);
  }, [cartItems]);

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => String(item._id) !== String(id)));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          String(item._id) === String(id) ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const productToAddId = String(product._id);
      const existing = prev.find((item) => String(item._id) === productToAddId);

      if (existing) {
        return prev.map((item) =>
          String(item._id) === productToAddId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
