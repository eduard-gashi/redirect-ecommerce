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
      <div className="text-center mt-20">
        <p className="text-2xl mb-4">🛒</p>
        <p className="text-xl mb-6">Dein Warenkorb ist leer</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
    <div className="container mx-auto px-4 py-12 mt-20 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Dein Warenkorb</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-center border-b py-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <img
                src={`/${item.image}`} 
                alt={item.name}
                className="h-20 w-20 rounded object-cover"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">€{item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Quantity and Remove Button */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-3 py-1 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-3 py-1 font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:underline"
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}

        {/* Total and Actions */}
        <div className="flex justify-between items-center mt-6 text-xl font-bold">
          <p>Gesamt:</p>
          <p>€{total.toFixed(2)}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={clearCart}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Warenkorb leeren
          </button>
          <button 
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Zur Kasse gehen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;