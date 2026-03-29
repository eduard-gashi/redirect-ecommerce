import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import apiClient from "../../apiClient";
import type { Product } from "../../types/data-types";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE);

type Props = {
  product: Product;
  quantity: number;
  onClose: () => void;
};

export default function CheckoutOverlay({ product, quantity, onClose }: Props) {
  const fetchClientSecret = useCallback(async () => {
    const { data } = await apiClient.post("/stripe/create-checkout-session", {
      product,
      quantity,
    });
    return data.clientSecret;
  }, [product, quantity]);

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <button className="checkout-close" onClick={onClose}>
          ×
        </button>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
