import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import apiClient from "../apiClient";
import { AuthContext } from "../context/AuthContext";
import { Package, Mail, MapPin, CreditCard, CheckCircle, XCircle, Info } from "lucide-react";
import "../styles/order.css";
import type { OrderSummary } from "../types/order.ts";

function OrderSuccessScreen() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { state } = useContext(AuthContext);
  const userInfo = state.userInfo;
  const [status, setStatus] = useState("loading");
  const [orderData, setOrderData] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

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

        const userId = userInfo?._id ?? null;

        // Create Order in MongoDB
        const { data: order } = await apiClient.post("/orders", {
          user: userId,
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

        setOrderData({
          orderNumber: order._id.slice(-8).toUpperCase(),
          email: session.customer_details.email,
          address: `${session.customer_details.address.line1}, ${session.customer_details.address.city}, ${session.customer_details.address.postal_code}`,
          items: order.orderItems.length,
          total: order.totalPrice,
        });

        setStatus("success");
      } catch (err) {
        console.error("Error finalizing order:", err);
        setStatus("error");
      }
    };

    finalizeOrder();
  }, [sessionId, userInfo]);

  // Loading State
  if (status === "loading") {
    return (
      <div className="order-processing-container">
        <div className="order-processing-card">
          <div className="processing-spinner" />
          <h2 className="processing-title">Bestellung wird verarbeitet...</h2>
          <p className="processing-message">
            Bitte warten Sie, während wir Ihre Zahlung bestätigen und Ihre Bestellung finalisieren.
          </p>
        </div>
      </div>
    );
  }

  // Not Paid State
  if (status === "not_paid") {
    return (
      <div className="order-processing-container">
        <div className="order-error-card">
          <div className="error-icon-wrapper">
            <XCircle className="error-icon" />
          </div>
          <h2 className="error-title">Zahlung noch nicht abgeschlossen</h2>
          <p className="error-message">
            Ihre Zahlung wurde noch nicht bestätigt. Bitte überprüfen Sie Ihre E-Mails oder versuchen Sie es erneut.
          </p>
          <Link to="/produkte" className="success-button-primary">
            Zurück zum Shop
          </Link>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="order-processing-container">
        <div className="order-error-card">
          <div className="error-icon-wrapper">
            <XCircle className="error-icon" />
          </div>
          <h2 className="error-title">Fehler bei der Bestellung</h2>
          <p className="error-message">
            Es ist ein Fehler beim Speichern Ihrer Bestellung aufgetreten. Bitte kontaktieren Sie unseren Support.
          </p>
          <Link to="/produkte" className="success-button-primary">
            Zurück zum Shop
          </Link>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <CheckCircle className="success-icon" />
        </div>

        {/* Title & Message */}
        <h1 className="success-title">Vielen Dank für Ihre Bestellung!</h1>
        <p className="success-message">
          Wir haben Ihre Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.
          Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
        </p>

        {/* Order Summary */}
        {orderData && (
          <div className="order-summary-section">
            <h2 className="order-summary-title">Bestellzusammenfassung</h2>

            <div className="order-summary-details">
              {/* Order Number */}
              <div className="order-detail-row">
                <Package className="order-detail-icon" />
                <div className="order-detail-content">
                  <span className="order-detail-label">Bestellnummer</span>
                  <span className="order-detail-value">#{orderData.orderNumber}</span>
                </div>
              </div>

              {/* Email */}
              <div className="order-detail-row">
                <Mail className="order-detail-icon" />
                <div className="order-detail-content">
                  <span className="order-detail-label">Bestätigung an</span>
                  <span className="order-detail-value">{orderData.email}</span>
                </div>
              </div>

              {/* Address */}
              <div className="order-detail-row full-width">
                <MapPin className="order-detail-icon" />
                <div className="order-detail-content">
                  <span className="order-detail-label">Lieferadresse</span>
                  <span className="order-detail-value address">{orderData.address}</span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="order-detail-row full-width">
                <CreditCard className="order-detail-icon" />
                <div className="order-detail-content">
                  <span className="order-detail-label">Zahlungsstatus</span>
                  <div className="order-summary-status">
                    <span className="status-dot"></span>
                    Bezahlt
                  </div>
                </div>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="order-total-highlight">
              <div className="order-total-label">Gesamtbetrag</div>
              <div className="order-total-value">€{orderData.total.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="success-info-box">
          <Info className="info-box-icon" />
          <p className="info-box-text">
            Sie erhalten eine Versandbestätigung mit Tracking-Informationen, sobald Ihre Bestellung versandt wurde.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="success-actions-group">
          <Link to="/produkte" className="success-button-secondary">
            Weiter einkaufen
          </Link>
          <Link to="/profil" className="success-button-primary">
            Meine Bestellungen ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessScreen;
