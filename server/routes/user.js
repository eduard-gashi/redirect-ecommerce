import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import TempRegistration from '../models/TempRegistration.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Login Endpoint
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    console.log('Nutzer versucht sich anzumelden mit:', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("Eingegebenes passwort:", password);
    console.log("Gefundener Benutzer:", user);

    if (user && (await user.matchPassword(password))) {
      console.log("Login erfolgreich für E-Mail:", email);
      res.json({
        _id: user._id,
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
    const { email, password } = req.body;

    // Check whether the email is already registered
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Diese E-Mail ist bereits registriert. Bitte melden Sie sich an.');
    }

    if (!password || password.length < 8) {
      res.status(400);
      throw new Error('Passwort fehlt oder ist zu kurz.');
    }

    // Hash the password before storing it temporarily in the database
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password.trim(), salt);


    await TempRegistration.deleteOne({ email });

    // Generate a unique registration token
    const registrationToken = uuidv4();

    // Create a temporary registration entry
    await TempRegistration.create({
      email,
      passwordHash,
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

    const { email, passwordHash } = tempReg;

    const user = await User.create({
      email: email,
      password: passwordHash,
    });

    // 3. Delete temporary registration entry
    await TempRegistration.deleteOne({ registrationToken: token });

    // 4. Send success message and navigate the user to his profile page
    res.json({
      message: 'Konto erfolgreich erstellt! Sie können sich jetzt anmelden.',
      userId: user._id
    });
  })
);

export default router;