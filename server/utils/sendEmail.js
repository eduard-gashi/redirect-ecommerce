import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // z.B. Gmail, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verifizierungs-E-Mail erfolgreich an ${email} gesendet.`);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    throw new Error('E-Mail konnte nicht gesendet werden. Versuchen Sie es später erneut.', {
      cause: error,
    });
  }
};

export default sendEmail;
