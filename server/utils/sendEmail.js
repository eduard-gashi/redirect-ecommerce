import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, htmlContent) => {
  // Ersetzen Sie dies mit Ihren tatsächlichen SMTP-Anmeldeinformationen
  const transporter = nodemailer.createTransport({
    service: 'gmail', // z.B. Gmail, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM, // Ihre Absender-E-Mail
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verifizierungs-E-Mail erfolgreich an ${email} gesendet.`);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    // Es ist wichtig, diesen Fehler zu behandeln, z.B. einen 500er-Status zu senden
    throw new Error('E-Mail konnte nicht gesendet werden. Versuchen Sie es später erneut.');
  }
};

export default sendEmail;