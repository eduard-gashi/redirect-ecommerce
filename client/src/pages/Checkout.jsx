import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../components/../context/CartContext";
import apiClient from '../apiClient';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID;

function CheckoutScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 

  const defaultQuantity = location.state?.checkoutQuantity || 1;

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(defaultQuantity); 
  const { addToCart, clearCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error while loading the product:", err);
      }
    };
    if (id) { 
      console.log("Fetching product with ID:", id);
       fetchProduct();
      } else {
        console.warn("Product ID is missing in URL parameters.");
      }
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Produkt wird geladen...</p>;
  }

  // --- PayPal Express Checkout Logic ---
  const createOrder = (data, actions) => {
    // 1. Create order based on price and quantity
    const purchasePrice = product.price * quantity;

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "EUR",
          value: purchasePrice.toFixed(2),
        },
        items: [{
          name: product.name,
          unit_amount: { currency_code: "EUR", value: product.price.toFixed(2) },
          quantity: quantity,
        }]
      }],
      application_context: {
        shipping_preference: "SET_PROVIDED_ADDRESS",
      }
    }).then(orderID => {
      console.log("PayPal Express Order ID:", orderID);
      return orderID;
    });
  };

  const onApprove = async (data, actions) => {
    // 2. Payment approved by user, get details (address etc.)
    const details = await actions.order.capture();
    
    const shippingAddress = {
        name: details.payer.name.given_name + ' ' + details.payer.name.surname,
        address: details.purchase_units[0].shipping.address.address_line_1,
        city: details.purchase_units[0].shipping.address.admin_area_2,
        postalCode: details.purchase_units[0].shipping.address.postal_code,
    };
    
    // 3. Save order in backend and clear cart
    if (details.status === 'COMPLETED') {
      const orderData = {
          orderItems: [{ ...product, quantity: quantity }], 
          shippingAddress: shippingAddress,
          paymentMethod: 'PayPal Express',
          totalPrice: product.price * quantity,
          paymentResult: { id: details.id, status: details.status },
      };

      try {
          const orderRes = await apiClient.post('/orders', orderData); 
          
          if (orderRes.status === 201) {
              clearCart();
              navigate(`/order/${orderRes.data._id}`);
          }
      } catch (err) {
          console.error("Fehler beim Speichern der Express-Bestellung:", err);
      }
    }
  };

  const onCancel = () => {
    console.log("PayPal Express Zahlung abgebrochen.");
  };

  // --- Render Block ---
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white hover-product border rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex flex-row gap-10 transition-transform">
          
          {/* Image Box */}
          <div className="flex-1 flex justify-center">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="rounded-lg max-h-[300px] object-cover"
            />
          </div>

          {/* Details & Cart */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Price and Description */}
            <p className="text-xl font-semibold mb-4">€{product.price}</p>

            {/* Amount */}
            <div className="quantity-input-wrapper"></div>

            <p className="font-bold mb-4">
              Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* 1. Regular cart checkout */}
                <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.countInStock === 0}
                    className="add-to-cart-button" 
                >
                    🛒 In den Warenkorb
                </button>

                {/* 2. PayPal Checkout */}
                <div style={{ marginTop: '10px' }}>
                    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "EUR" }}>
                        <PayPalButtons
                            style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal", tagline: false }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onCancel={onCancel}
                            disabled={product.countInStock === 0}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
