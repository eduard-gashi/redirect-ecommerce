import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";

function Header() {
  const { cartItems } = useContext(CartContext); // Zugriff auf Warenkorb

  return (
    <header style={{ position: "sticky" }} className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="/redirect.png"
            alt="Redirect Logo"
            className="hover-logo h-14 transition-transform"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-800 font-medium">
          {/* Contact */}
          <Link to="/kontakt" className="hover:text-blue-600 transition-colors">
            Kontakt
          </Link>

          {/* Prodcuts */}
          <Link to="/products">
            Produkte
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Buy Now */}
          <a
            href="#produkt"
            className=" text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: "#82CABC" }}
          >
            Jetzt kaufen
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
