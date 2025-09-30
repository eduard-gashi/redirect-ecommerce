import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Redirect to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <p className="cart-empty-icon">🛒</p>
        <p className="cart-empty-text logo-color">Dein Warenkorb ist leer</p>
        <Link 
          to="/" 
          className="cart-empty-button"
        >
          Weiter einkaufen
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Dein Warenkorb</h1>
      <div className="cart-content-wrapper">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="cart-item"
          >
            {/* Product Info */}
            <div className="cart-item-info">
              <img
                src={`/${item.image}`} 
                alt={item.name}
                className="cart-item-image"
              />
              <div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">€{item.price?.toFixed(2) ?? '0.00'}</p>
              </div>
            </div>

            {/* Quantity and Remove Button */}
            <div className="cart-item-actions">
              <div className="cart-quantity-controls">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="cart-quantity-button"
                >
                  -
                </button>
                <span className="cart-quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="cart-quantity-button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="cart-item-remove-button"
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}

        {/* Total and Actions */}
        <div className="cart-summary-total">
          <p>Gesamt:</p>
          <p>€{total.toFixed(2)}</p>
        </div>

        <div className="cart-actions-group">
          <button
            onClick={clearCart}
            className="cart-clear-button"
          >
            Warenkorb leeren
          </button>
          <button 
            onClick={handleCheckout}
            className="cart-checkout-button"
          >
            Zur Kasse gehen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;