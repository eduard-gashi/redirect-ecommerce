# redirect-ecommerce
A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## About The Project
This project is the official e-commerce platform for the GbR founded by my Philipp Kaiser and Eduard Gashi. 

Our mission: build tangible products that address modern digital challenges.

The first product is the Smartphone Detox Box - a 30‑day guided program to help people (especially Gen Z) build a healthier relationship with their phone through daily challenges and a reflection journal.

## Production

- https://www.redirectstore.de/


## Tech Stack
- Frontend: React (Vite), React Router

- Backend: Node.js, Express.js

- Database: MongoDB + Mongoose

- Payments: Stripe Embedded Checkout (test & live)

- Deployment: Vercel (frontend), Render (backend)

- CI/CD: GitHub Actions (manually triggered deploys to Vercel & Render)


## API Overview
Backend base URL (prod): https://redirect-ecommerce-backend.onrender.com/api
- GET /api/products – list products

- GET /api/products/:id – access one specific product

- POST /api/orders – create order (MongoDB)

- GET /api/orders?user=:userId – list orders for a user

- POST /api/users/login – user login (JWT)

- POST /api/users/register – user registration

- POST /api/stripe/create-checkout-session – create Stripe Embedded Checkout session

- GET /api/stripe/session/:id – retrieve Checkout Session for order finalization


## Architecture Details
- MongoDB is the single source of truth for products (price, stock, metadata).
- Stripe is used purely as a payment layer; prices are validated against MongoDB, not client input.
- Orders are created in MongoDB only after verifying the Stripe Checkout Session status.


## Getting Started (local)
### Backend
cd server

npm install

npm run dev # expects MongoDB + STRIPE_SECRET_KEY in .env


### Frontend
cd client

npm install

npm run dev # expects VITE_API_BASE_URL and VITE_STRIPE_PUBLISHABLE_KEY in .env
