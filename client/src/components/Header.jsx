import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";

function Header() {
  const { cartItems } = useContext(CartContext); 
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo-link">
          <img
            src="/redirect.png"
            alt="Redirect Logo"
            className="logo-image"
          />
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          {/* Contact */}
          <Link to="/kontakt" className="nav-link contact-link">
            Kontakt
          </Link>

          {/* Prodcuts */}
          <Link to="/products" className="nav-link">
            Produkte
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="nav-link cart-link"
          >
            🛒
            {/* Count Items */}
            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Buy Now Button */}
          <a
            href="#produkt"
            className="nav-link buy-now-button"
          >
            Jetzt kaufen
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;