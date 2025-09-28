import React, { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage initially
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  // Remove products from the Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => String(item._id) !== String(id)));
  };

  // Clear the entire Cart
  const clearCart = () => setCartItems([]);

  // Update quantity of a specific item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id); // Remove item if quantity is less than 1
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          String(item._id) === String(id) ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Add Prodcuts to the Cart
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const productToAddId = String(product._id);
      
      const existing = prev.find((item) => {
        const itemIdInCart = String(item._id);
        return itemIdInCart === productToAddId;
      });

      if (existing) {
        /* Product already in cart, update quantity */
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
