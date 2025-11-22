import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export function StripeCheckoutForm({ product, quantity }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    console.log("HANDLING SUBMIT STRIPE");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://redirectstore.de/order/success",
      },
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>Jetzt bezahlen</button>
    </form>
  );
}

export default StripeCheckoutForm;