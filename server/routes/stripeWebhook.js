import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

export async function stripeWebhookHandler(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Stripe event type:', event.type);
  if (event.type === 'checkout.session.completed') {
    console.log('Creating label');
    const session = event.data.object;
    const customerDetails = session.customer_details;
    const productId = session.metadata.productId;
    const productName = session.metadata.productName;

    // const labelResponse = await fetch('https://api.simplesell.de/shipments', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${process.env.SIMPLESELL_TOKEN}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         receiver: {
    //             name: customerDetails.name,
    //             street: customerDetails.address.line1,
    //             street2: customerDetails.address.line2 || '',
    //             zipcode: customerDetails.address.postal_code,
    //             city: customerDetails.address.city,
    //         },
    //         shipping_method_id: 'dhl-paket',
    //         parcel: { weight: '0.5' }
    //     })
    // });
    // console.log("Successfully create a label for: ", customerDetails.name);

    // const labelData = await labelResponse.json();
    // const labelUrl = labelData.label_url;

    // Fetch bought items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });
    const totalQuantity = lineItems.data.reduce((sum, item) => sum + item.quantity, 0);
    const firstItem = lineItems.data[0];
    const itemQuantity = firstItem?.quantity ?? 1;
    const itemProductName = productName || firstItem?.price?.product || 'Produkt';

    // Send notification E-Mail with lables
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Redirect Shipping Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🚚 NEUE BESTELLUNG #${session.id.slice(-7)} - Bestelldaten`,
        html: `
        <h2>Bestellung erhalten!</h2>
        <p><strong>An:</strong> ${customerDetails.name}<br>
           ${customerDetails.address.line1}<br>
           ${customerDetails.address.line2 || ''}<br>
           ${customerDetails.address.postal_code} ${customerDetails.address.city}</p>

        <p><strong>Produkt:</strong> ${itemProductName}</p>
        <p><strong>Menge:</strong> ${itemQuantity}</p>
        <p><strong>Insgesamt:</strong> ${totalQuantity} Stück</p>

        <p><strong>Produkt-ID (metadata):</strong> ${productId}</p>
      `,
      });

      console.log('✅ Mail gesendet:', info.messageId);
    } catch (err) {
      console.error('Nodemailer error:', err);
    }
  }
  res.json({ received: true });
}
