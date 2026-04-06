import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import userRoutes from './routes/user.js';
import stripeRoutes from './routes/stripe.js';
import healthRoutes from './routes/health.js';
import { stripeWebhookHandler } from './routes/stripeWebhook.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
app.use(cors());

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
