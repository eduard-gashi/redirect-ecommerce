import React from 'react';
import { Link, useParams } from 'react-router-dom';

function OrderSuccessScreen() {
  const { id } = useParams();

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div style={{
          fontSize: "30px"
        }} >
          ✅
        </div>
        <h1 className="title-black">Vielen Dank für Ihre Bestellung!</h1>
        <p className="text-paragraph">
          Wir haben Ihre Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.
          Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
        </p>
        <div style={{ display: "flex", gap: "10px", marginTop: "30px", justifyContent: "center" }}>
          <Link
            to="/"
            className="primary-button"
          >
            Weiter einkaufen
          </Link>
          <Link
            to="/profile"
            className="primary-button"
            style={{ backgroundColor: "grey" }}
          >
            Meine Bestellungen
          </Link>
        </div>
      </div>
    </div >
  );
}

export default OrderSuccessScreen;