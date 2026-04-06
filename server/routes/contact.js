import express from 'express';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    console.log('Received new message from a user via contact page.');
    const { name, email, phoneNumber, message } = req.body;

    if (!email || !message) {
      res.status(400);
      throw new Error('E-Mail und Nachricht sind erforderlich.');
    }

    const safeName = name || 'Unbekannt';
    const safePhone = phoneNumber || 'Nicht angegeben';

    const html = `
      <h2>Neue Kontaktanfrage</h2>
      <p><b>Name:</b> ${safeName}</p>
      <p><b>E-Mail:</b> ${email}</p>
      <p><b>Telefon:</b> ${safePhone}</p>
      <p><b>Nachricht:</b></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `;

    await sendEmail(
      process.env.EMAIL_TO || process.env.EMAIL_USER,
      'Neue Kontaktanfrage über die Website',
      html,
      { replyTo: email },
    );

    res.json({ message: 'Kontaktanfrage gesendet' });
  }),
);

export default router;
