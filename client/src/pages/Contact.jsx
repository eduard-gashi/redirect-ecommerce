import React from 'react';
import COMPANY_DETAILS from '../../config/config';


function Contact() {
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;

  return (
    <div className="contact-container">
      <h2 className="title-black">Kontakt</h2>
      <p className="text-paragraph">📞 Telefon: {PHONE}</p>
      <p className="text-paragraph">📧 E-Mail: {EMAIL}</p>
      <p className="text-paragraph">📍 Adresse: {STREET}, {ZIP_CITY}</p>
    </div>
  );
}

export default Contact;
