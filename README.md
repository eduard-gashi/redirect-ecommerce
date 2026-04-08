# redirect-ecommerce
A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) for the Redirect Store, the official online shop for Kaishi GbR.

## About The Project
Redirect GbR was founded by Philipp Kaiser and Eduard Gashi with the goal of building tangible products that address modern digital challenges.

Our first product: the Smartphone Detox Box – a 30‑day guided program that helps people (especially Gen Z) build a healthier relationship with their phones through daily challenges a reflection journal and a habit tracker as well as the box itself.

## Production

- Live Store: https://redirectstore.de/

Deployed on a dedicated Hetzner Linux server, running:
- NGINX (serving the static frontend and reverse‑proxying API requests)
- PM2 (managing the Node.js backend as a background service)
Domain is purchased and managed via Strato.



## Tech Stack
- Frontend: React (Vite), React Router

- Backend: Node.js, Express.js

- Database: MongoDB + Mongoose

- Payments: Stripe Embedded Checkout (test & live)

- Deployment: Hetzner (NGINX + PM2)

- CI/CD: Manual deploy via Git & SSH


## Architecture Overview
- MongoDB is the single source of truth for all product data (price, stock, metadata).
- Stripe acts purely as a payment processor — prices and products are always validated server‑side against MongoDB.
- Orders are persisted only after verifying a completed Stripe Checkout Session.
- Environment variables (MongoDB URI, Stripe keys, etc.) are securely loaded through .env.


## API Overview
Base URL (production): /api

- /products – Product catalog endpoints

- /orders – Order creation and retrieval

- /orders - Registration and authentication (JWT‑based)

- /stripe – Stripe session creation and management

- /stripe/webhook – Stripe event handler

- /contact – Contact form submission

- /health – Health check endpoint
 
Example backend: server/server.js (see routes imports)


### Stripe Webhook (Backend)
The backend uses a **Stripe Webhook** to react to completed payments. The following environment variable must be set:

```env
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
```

Stripe calls the endpoint `POST /api/stripe/webhook` each time an order is finalized.  
This webhook URL must be configured in the **Stripe Dashboard** under Webhooks. It is not mandatory to create the webhook in order to use this application.
When a `checkout.session.completed` event is received, the server sends a **confirmation email with the order details** to the customer.


### Sending Emails (Backend)
For sending automated order confirmation emails, the following environment variables must be set in the backend:

```env
EMAIL_USER=<your_notification_email_address>
EMAIL_PASS=<app_password_for_that_email>
```

The `EMAIL_USER` is the sender email address used for notifications.  
The `EMAIL_PASS` must be an **app‑specific password** (App Password) generated for that email account, not the regular account password (e.g. via Gmail’s “App passwords”).  

These variables are used to send confirmation emails to customers after an order is finalized.


## Getting Started (local)
### Backend
```bash
cd server

npm install

npm start 
```

Needs a .env file with
```env
MONGO_URI=<your_mongo_uri>

STRIPE_SECRET_KEY_LIVE=<your_stripe_secret_key>

STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

EMAIL_USER=<your_notification_email_address>

EMAIL_PASS=<app_password_for_that_email>
```

### Frontend
```bash
cd client

npm install

npm run dev 
```
Needs a .env file with
```env
VITE_STRIPE_PUBLISHABLE_KEY_LIVE=<your_stripe_publishable_key>
```
