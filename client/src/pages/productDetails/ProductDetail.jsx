import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import apiClient from '../../apiClient';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID;


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Produkt wird geladen...</p>;
  }

  const createOrder = (data, actions) => {
    // 1. Create order based on price and quantity
    const purchasePrice = product.price * quantity;
    const totalValue = purchasePrice.toFixed(2);

    console.log("Creating PayPal Express Order for:");

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "EUR",
          value: totalValue, // Use the fixed total value
          // 🆕 ADD THE BREAKDOWN SECTION
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: totalValue,
            },
          }
        },
        items: [{
          name: product.name,
          // Ensure product.price is converted to a string with 2 decimals here too
          unit_amount: { currency_code: "EUR", value: product.price.toFixed(2) },
          quantity: quantity,
        }]
      }]
    }).then(orderID => {
      console.log("PayPal Express Order ID:", orderID);
      return orderID;
    });
  };

  const onApprove = async (data, actions) => {
    // 2. Payment approved by user, get details (address etc.)
    const details = await actions.order.capture();  // All relevant information are saved in details

    // TODO: Replace with actual user ID from auth context or state
    const USER_ID = 'your_authenticated_user_id';

    // Extract country code from PayPal details
    const countryCode = details.purchase_units[0].shipping.address.country_code || "DE";

    const shippingAddress = {
      name: details.payer.name.given_name + ' ' + details.payer.name.surname,
      address: details.purchase_units[0].shipping.address.address_line_1,
      city: details.purchase_units[0].shipping.address.admin_area_2,
      postalCode: details.purchase_units[0].shipping.address.postal_code,
      country: countryCode,
    };


    // 3. Save order in backend and clear cart
    if (details.status === 'COMPLETED') {
      const itemPrice = product.price * quantity; // Calculate item price

      const orderData = {
        // 🆕 REQUIRED FIELD: Must send the user ID
        user: USER_ID,

        orderItems: [{
          name: product.name,
          // 🆕 FIX KEY NAME: Use 'qty' as required by schema
          qty: quantity,
          image: product.image,
          price: product.price,
          // 🆕 REQUIRED FIELD: Link to the Product Mongoose ID
          product: product._id,
        }],

        shippingAddress: shippingAddress,
        paymentMethod: 'PayPal Express',

        // 🆕 REQUIRED FIELDS: Calculate and include pricing details
        itemsPrice: itemPrice,
        taxPrice: 0.00, // Assuming 0 for now, calculate based on your logic
        shippingPrice: 0.00, // Assuming 0 for now
        totalPrice: itemPrice,

        // Set payment status
        isPaid: true,
        paidAt: new Date().toISOString(),

        // Payment Result details
        paymentResult: {
          id: details.id,
          status: details.status,
          update_time: details.update_time,
          email_address: details.payer.email_address,
        },
      };

      try {
        const orderRes = await apiClient.post('/orders', orderData);
        console.log("Express-Bestellung gespeichert:", orderRes.data);
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


  return (
    <div>
      <div className="product-detail-container">
        <div className="product-detail-card hover-product">
          {/* Image Box */}
          <div className="product-image-container">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="product-image"
            />
          </div>

          {/* Description, Price & add to Cart */}
          <div style={{ flex: "1 1 0%" }}>
            <h1 className="title-black">{product.name}</h1>

            <p className="text-paragraph">
              {product.description}
            </p>
            <br />
            <p className="text-bold">€{product.price}</p>
            <br />

            <div className="quantity-input-wrapper">
              {/* Minus Button */}
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-button"
                disabled={quantity <= 1}
              >
                –
              </button>

              {/* Input Field */}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="quantity-input"
              />

              {/* Plus Button */}
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-button"
              >
                +
              </button>
            </div>

            <br />

            <p className="text-bold">
              Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* PayPal Express-Checkout */}
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

export default ProductDetail;
