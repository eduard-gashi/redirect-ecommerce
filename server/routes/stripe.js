import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY_LIVE);

router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Create Checkout Session Request Body:', req.body);
    const { product, quantity } = req.body;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: product.name },
            unit_amount: Math.round(product.price * 100),
          },
          quantity,
        },
      ],
      metadata: {
        productId: product._id.toString(),
        userId: req.user?._id?.toString() || '',
      },
      shipping_address_collection: {
        allowed_countries: ['DE'],
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1TJfyd42SFmEoZIO8cF3t2sf',
        },
      ],
      return_url: `${req.headers.origin}/bestellungen?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/session/:id', async (req, res) => {
  try {
    console.log('Retrieve Session ID:', req.params.id);
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ['line_items', 'line_items.data.price'],
    });
    res.json(session);
  } catch (err) {
    console.error('Error retrieving session:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
