import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripeCheckoutWrapper({ children, clientSecret }) {
  console.log("STRIPE WRAPPER");
  if (!clientSecret) return <div>Lädt Zahlungsdaten...</div>;

  return (
    <Elements stripe={stripePromise} options={{clientSecret}}>
      {children}
    </Elements>
  );
}

export default StripeCheckoutWrapper;