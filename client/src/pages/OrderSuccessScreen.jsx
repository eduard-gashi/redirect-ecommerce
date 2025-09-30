import React from 'react';
import { Link, useParams } from 'react-router-dom';

function OrderSuccessScreen() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-12 mt-20 text-center max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-4">Vielen Dank für Ihre Bestellung!</h1>
        <p className="text-gray-700 mb-6">
          Wir haben Ihre Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.
          Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
        </p>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="text-lg font-semibold">Ihre Bestellnummer lautet:</p>
          <p className="text-md text-gray-800 font-mono">{id}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Weiter einkaufen
          </Link>
          <Link 
            to="/profile"
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Meine Bestellungen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessScreen;