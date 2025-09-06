import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <p className="text-center mt-20 text-xl">🛒 Dein Warenkorb ist leer</p>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-6">🛒 Dein Warenkorb</h1>

      <div className="bg-white rounded-lg shadow p-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Menge: {item.quantity} × €{item.price}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 hover:underline"
            >
              Entfernen
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 text-xl font-bold">
          <p>Gesamt:</p>
          <p>€{total.toFixed(2)}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={clearCart}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Warenkorb leeren
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Zur Kasse gehen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
