import { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE);

export default function EmbeddedCheckout({ clientSecret }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!clientSecret) return;

    const init = async () => {
      const stripe = await stripePromise;
      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });
      checkout.mount(containerRef.current);
    };

    init();
  }, [clientSecret]);

  return <div id="checkout" ref={containerRef} />;
}
