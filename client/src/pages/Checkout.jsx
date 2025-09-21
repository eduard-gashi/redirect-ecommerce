import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';

// CORRECT: Use your Stripe PUBLISHABLE Key here
const stripePromise = loadStripe('pk_test_51S9q9hLdadOC4urYTiGAsvhwFpLm2nPBzVuFN7PwvBh0coU5PIRRjmJszCIm5YlnSMWUs91atjoX2bv9PutoDIXG00hwqY4tBm');

// --- Payment Form Component ---
// This component contains the Stripe-specific logic.
const PaymentForm = ({ shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    // 1. Create a Payment Intent on your server
    const res = await fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(total * 100) }), // Convert to cents
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setProcessing(false);
      return;
    }
    
    // 2. Confirm the payment on the client
    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: shippingAddress.name }, // Use name from form
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    // 3. Payment succeeded! Now create the order in your database
    if (paymentIntent.status === 'succeeded') {
      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: 'Stripe',
        totalPrice: total,
        paymentResult: { id: paymentIntent.id, status: paymentIntent.status },
      };

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' /* Add Auth token here */ },
        body: JSON.stringify(orderData),
      });

      if (orderRes.ok) {
        const createdOrder = await orderRes.json();
        clearCart();
        navigate(`/order/${createdOrder._id}`); // Redirect to a success page
      } else {
        setError('Failed to save the order.');
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={paymentHandler}>
      <h2 className="text-2xl font-bold my-6">Zahlungsinformationen</h2>
      <div className="p-4 border rounded">
        <CardElement />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="bg-green-600 text-white w-full px-6 py-3 rounded hover:bg-green-700 mt-6"
      >
        {processing ? 'Verarbeite...' : `Bezahlen €${total.toFixed(2)}`}
      </button>
    </form>
  );
};

// --- Main Checkout Screen Component ---
// This component manages the overall flow (address -> payment).
function CheckoutScreen() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [shippingAddress, setShippingAddress] = useState(null);

  const submitShippingHandler = (data) => {
    setShippingAddress(data); // Save address and proceed to payment view
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-20 max-w-2xl">
      {/* Conditionally render Address Form or Payment Form */}
      {!shippingAddress ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Lieferadresse</h1>
          <form onSubmit={handleSubmit(submitShippingHandler)} className="bg-white p-6 rounded-lg shadow">
            {/* I added a name field, which is useful for billing details */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
              <input id="name" {...register("name", { required: "Name is required" })} className="w-full p-2 border rounded"/>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 font-medium">Adresse</label>
              <input id="address" {...register("address", { required: "Adresse ist erforderlich" })} className="w-full p-2 border rounded"/>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-2 font-medium">Stadt</label>
              <input id="city" {...register("city", { required: "Stadt ist erforderlich" })} className="w-full p-2 border rounded"/>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block mb-2 font-medium">Postleitzahl</label>
              <input id="postalCode" {...register("postalCode", { required: "Postleitzahl ist erforderlich" })} className="w-full p-2 border rounded"/>
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
            </div>
            <button type="submit" className="bg-blue-600 text-white w-full px-6 py-3 rounded hover:bg-blue-700">
              Weiter zur Zahlung
            </button>
          </form>
        </>
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentForm shippingAddress={shippingAddress} />
        </Elements>
      )}
    </div>
  );
}

export default CheckoutScreen;