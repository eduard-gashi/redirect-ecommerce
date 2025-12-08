import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../apiClient";
import { AuthContext } from "../context/AuthContext";



function OrderSuccessScreen() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { state, dispatch } = useContext(AuthContext);
  const userInfo = state.userInfo;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId || !userInfo._id) return;

    const finalizeOrder = async () => {
      try {
        // Get Session details from Stripe
        const { data: session } = await apiClient.get(
          `/stripe/session/${sessionId}`
        );
        console.log("session from backend", session);

        const item = session.line_items?.data?.[0];
        if (!item) {
          setStatus("error");
          return;
        }
        console.log("Line item:", item);

        if (session.payment_status !== "paid") {
          setStatus("not_paid");
          return;
        }

        console.log("Finalizing order for session:", session);

        // Create Order in MongoDB
        await apiClient.post("/orders", {
          user: userInfo._id,
          orderItems: [
            {
              name: item.description,
              qty: item.quantity,
              price: item.price.unit_amount / 100,
              product: session.metadata.productId,
            },
          ],
          shippingAddress: {
            address: session.customer_details.address.line1,
            city: session.customer_details.address.city,
            postalCode: session.customer_details.address.postal_code,
            country: session.customer_details.address.country,
          },
          paymentMethod: "Stripe",
          taxPrice: 0,
          shippingPrice: 0,
          paymentResult: {
            id: session.payment_intent,
            status: session.payment_status,
            email_address: session.customer_details.email,
          },
        });

        setStatus("success");
      } catch (err) {
        console.error("Error finalizing order:", err);
        setStatus("error");
      }
    };

    finalizeOrder();
  }, [sessionId, userInfo]);

  if (status === "loading") return <p>Bestellung wird geprüft...</p>;
  if (status === "not_paid") return <p>Zahlung noch nicht abgeschlossen.</p>;
  if (status === "error") return <p>Fehler beim Speichern der Bestellung.</p>;


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