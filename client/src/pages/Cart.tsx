import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import { Product } from "../types/data-types";


function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { openCheckout } = useCheckout();

  const handleOpenCheckout = () => {
    openCheckout(cartItems[0], cartItems[0].quantity);
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <p className="cart-empty-icon">🛒</p>
        <p className="cart-empty-text">Dein Warenkorb ist leer</p>
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
    (sum: number, item: Product) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="product-title">Dein Warenkorb</h1>
      <div className="cart-content-wrapper">
        {cartItems.map((item: Product) => (
          <div
            key={item._id}
            className="cart-item"
          >
            {/* Product Info */}
            <div className="cart-item-info">
              <img
                src={`/images/products/${item.image_paths?.[0]}`}
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
        <div className="text-paragraph">
          <p>Gesamt:</p>
          <p>€{total.toFixed(2)}</p>
        </div>

        <div className="cart-actions-group">
          <button
            onClick={clearCart}
            className="primary-button"
          >
            Warenkorb leeren
          </button>
          <button
            onClick={handleOpenCheckout}
            className="primary-button"
          >
            Zur Kasse gehen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;