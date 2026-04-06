import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Cart updated:', cartItems);
  }, [cartItems]);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => String(item._id) !== String(id)));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          String(item._id) === String(id) ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const productToAddId = String(product._id);

      const existing = prev.find((item) => String(item._id) === productToAddId);

      if (existing) {
        return prev.map((item) =>
          String(item._id) === productToAddId
            ? { ...item, quantity: item.quantity + quantity }
            : item
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