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

        {/* Hamburger mobile */}
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

        {/* Navigation desktop*/}
        <nav className="main-nav">
          {/* Contact */}
          <Link to="/kontakt" className="nav-link">
            Kontakt
          </Link>

          {/* Prodcuts */}
          <Link to="/produkte" className="nav-link">
            Produkte
          </Link>

          {/* User Logind and profile page */}
          <Link to="/profil" className="profile-link">
            <FaUserCircle size={24} style={{ marginRight: '5px' }} />
          </Link>

          {/* Cart */}
          <Link
            to="/warenkorb"
            className="cart-link"
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
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            className="close-menu-button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Menü schließen"
          >
            <FaTimes size={22} />
          </button>

          <nav className="mobile-nav">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Startseite</Link>
            <Link to="/produkte" onClick={() => setMobileMenuOpen(false)}>Produkte</Link>
            <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;