import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const amount = Math.round(product.price * quantity * 100); // Stripe erwartet Cent!

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe Payment Error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
