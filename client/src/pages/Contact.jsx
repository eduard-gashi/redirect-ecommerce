import React from 'react';
import COMPANY_DETAILS from '../../config/config';


function Contact() {
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;

  return (
    <div className="p-12 min-h-screen text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Kontakt</h2>
      <p className="text-gray-700 mb-2">📞 Telefon: {PHONE}</p>
      <p className="text-gray-700 mb-2">📧 E-Mail: {EMAIL}</p>
      <p className="text-gray-700">📍 Adresse: {STREET}, {ZIP_CITY}</p>
    </div>
  );
}

export default Contact;
