import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid'; // Token-Generator
import TempRegistration from '../models/TempRegistration.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Login Endpoint
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    console.log('POST /login aufgerufen');
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("Eingegebenes passwort:", password);

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      console.log("Ungültige Login-Versuche für E-Mail:", email);
      console.log(user);
      res.status(401);
      throw new Error('Ungültige E-Mail oder ungültiges Passwort.');
    }
  })
);

// send-registration-email Endpoint 
router.post(
  '/send-registration-email',
  asyncHandler(async (req, res) => {
    console.log('POST /send-registration-email aufgerufen', req.body);
    const { email } = req.body;

    // Check whether the email is already registered
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Diese E-Mail ist bereits registriert. Bitte melden Sie sich an.');
    }

    await TempRegistration.deleteOne({ email });

    // Generate a unique registration token
    const registrationToken = uuidv4();

    // Create a temporary registration entry
    await TempRegistration.create({
      email,
      registrationToken,
    });


    let baseURL;

    if (process.env.NODE_ENV === 'development') {
      baseURL = 'http://localhost:5173';
    } else {
      baseURL = 'https://www.redirectstore.de';
    }

    const confirmationLink = `${baseURL}/confirm-registration?token=${registrationToken}`;
    
    const emailHtml = `
      <h1>Willkommen!</h1>
      <p>Vielen Dank für Ihre Registrierung. Bitte klicken Sie auf den Link, um Ihr Konto zu bestätigen:</p>
      <a href="${confirmationLink}">Konto bestätigen</a>
      <p>Dieser Link ist 1 Stunde gültig.</p>
    `;

    await sendEmail(
      email,
      'Bestätigen Sie Ihre Registrierung',
      emailHtml
    );


    res.json({
      message: `Registrierungs-E-Mail erfolgreich an ${email} gesendet.`,
    });
  })
);


// Confirm-registration Endpoint
router.get(
  '/confirm-registration',
  asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
      res.status(400);
      throw new Error('Fehlender Registrierungstoken.');
    }

    const tempReg = await TempRegistration.findOne({
      registrationToken: token
    });

    if (!tempReg) {
      res.status(404);
      throw new Error('Ungültiger oder abgelaufener Verifizierungslink.');
    }

    const { email } = tempReg;

    // 2. Finalen Benutzer in der Datenbank erstellen
    // HINWEIS: Hier müssten Sie typischerweise auch ein initiales Passwort (oder 
    // andere Daten, die Sie temporär gespeichert haben) abrufen. 
    // Für dieses Beispiel erstellen wir nur den User mit der E-Mail.
    const user = await User.create({
      name: email.split('@')[0], // Beispielhafter Name
      email: email,
      password: 'A_DEFAULT_PASSWORD_TO_BE_CHANGED', // Muss gesetzt sein, 
      // oder der Registrierungsprozess muss ein Passwortfeld im Frontend beinhalten.
    });

    // 3. Temporären Eintrag löschen (Token ist jetzt verbraucht)
    await TempRegistration.deleteOne({ registrationToken: token });

    // 4. Antwort an den Benutzer senden
    // Typischerweise leiten Sie den Nutzer zum Login oder einer Erfolgsmeldung weiter
    // Hier senden wir eine JSON-Antwort, aber im echten Leben wäre es eine Weiterleitung (redirect)
    res.json({
      message: 'Konto erfolgreich erstellt! Sie können sich jetzt anmelden.',
      userId: user._id
    });
  })
);

export default router;