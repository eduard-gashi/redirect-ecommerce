import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';


function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Hamburger */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FaBars size={28} />
        </button>

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
          <Link to="/kontakt" className="nav-link">
            Kontakt
          </Link>

          {/* Prodcuts */}
          <Link to="/products" className="nav-link">
            Produkte
          </Link>

          {/* User Logind and profile page */}
          <Link to="/profile" className="nav-link profile-link">
            <FaUserCircle size={24} style={{ marginRight: '5px' }} />
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
        </nav>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button
            className="close-menu-button"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes size={24} />
          </button>
          <nav className="mobile-nav">
            <Link to="/kontakt" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>
            <br></br>
            <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Produkte</Link>
          </nav>
        </div>
      )}

    </header>
  );
}

export default Header;