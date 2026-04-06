import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { Product } from '../types/data-types';
import { Trash2, ShoppingBag } from 'lucide-react';
import '../styles/cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { openCheckout } = useCheckout();

  const handleOpenCheckout = () => {
    if (cartItems.length > 0) {
      openCheckout(cartItems[0], cartItems[0].quantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="cart-empty-icon">
          <ShoppingBag size={64} strokeWidth={1.5} />
        </div>
        <h2 className="cart-empty-title">Dein Warenkorb ist leer</h2>
        <p className="cart-empty-text">
          Entdecke unsere Produkte und starte deine HandyDetox-Reise
        </p>
        <Link to="/produkte" className="cart-empty-button">
          Weiter einkaufen
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="products-view">
      <div className="cart-header">
        <h1 className="cart-title">Dein Warenkorb</h1>
      </div>

      <div className="cart-content-wrapper">
        <div className="cart-items-section">
          {cartItems.map((item: Product) => (
            <div key={item._id} className="cart-item">
              {/* Product Info */}
              <div className="cart-item-info">
                <div className="cart-item-image-wrapper">
                  {item.image_paths && item.image_paths.length > 0 ? (
                    <img
                      src={`/images/products/${item.image_paths[0]}`}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  ) : (
                    <div className="cart-item-image-placeholder">
                      <ShoppingBag size={32} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">€{item.price?.toFixed(2) ?? '0.00'}</p>
                </div>
              </div>

              {/* Quantity and Remove Button */}
              <div className="cart-item-actions">
                <div className="cart-quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="cart-quantity-button"
                    aria-label="Menge verringern"
                  >
                    −
                  </button>
                  <span className="cart-quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="cart-quantity-button"
                    aria-label="Menge erhöhen"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="cart-item-remove-button"
                  aria-label="Artikel entfernen"
                >
                  <Trash2 size={16} />
                  Entfernen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="cart-summary-card">
          <h2 className="cart-summary-title">Zusammenfassung</h2>

          <div className="cart-summary-row">
            <span className="cart-summary-label">Zwischensumme</span>
            <span className="cart-summary-value">€{total.toFixed(2)}</span>
          </div>

          <div className="cart-summary-divider"></div>

          <div className="cart-summary-row cart-summary-total">
            <span className="cart-summary-label">Gesamt</span>
            <span className="cart-summary-value">€{total.toFixed(2)}</span>
          </div>

          <p className="cart-summary-note">inkl. MwSt., zzgl. Versandkosten</p>

          <div className="cart-actions-group">
            <button onClick={handleOpenCheckout} className="cart-checkout-button">
              Zur Kasse gehen
            </button>
            <button onClick={clearCart} className="cart-clear-button">
              Warenkorb leeren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
