import { useState } from "react";
import {
  Calendar,
  MapPin,
  Package,
  CreditCard,
  ChevronDown,
  Clock,
  Truck,
  CheckCircle2
} from "lucide-react";
import type { Order } from "../../types/order";
import "../../styles/order.css";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getOrderNumber = (id: string) => {
    return id.slice(-8).toUpperCase();
  };

  // Get status config based on order.status or fallback to isDelivered
  const getStatusConfig = () => {
    if (order.status) {
      const configs = {
        pending: { label: 'Ausstehend', className: 'status-pending', Icon: Clock },
        processing: { label: 'In Bearbeitung', className: 'status-processing', Icon: Truck },
        shipped: { label: 'Versendet', className: 'status-shipped', Icon: Truck },
        delivered: { label: 'Zugestellt', className: 'status-delivered', Icon: CheckCircle2 },
        cancelled: { label: 'Storniert', className: 'status-cancelled', Icon: Package }
      };
      return configs[order.status] || configs.pending;
    }

    // Fallback to old isDelivered logic
    if (order.isDelivered) {
      return { label: 'Zugestellt', className: 'status-delivered', Icon: CheckCircle2 };
    }
    return { label: 'In Bearbeitung', className: 'status-processing', Icon: Truck };
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.Icon;

  return (
    <div className="order-summary-wrapper">
      <div className="order-card">
        {/* Card Header */}
        <div className="order-card-header">
          <div className="order-header-left">
            <div className="order-number-section">
              <Package className="order-header-icon" />
              <div>
                <span className="order-label">Bestellung</span>
                <span className="order-number">#{getOrderNumber(order._id)}</span>
              </div>
            </div>
            <div className="order-date-section">
              <Calendar className="order-header-icon-small" />
              <span className="order-date">{formatShortDate(order.createdAt || new Date().toISOString())}</span>
            </div>
          </div>

          <div className="order-header-right">
            <div className="order-total-section">
              <span className="order-total-label">Gesamt</span>
              <span className="order-total-price">€{order.totalPrice.toFixed(2)}</span>
            </div>
            <div className={`order-status-badge ${statusConfig.className}`}>
              <StatusIcon className="status-icon" />
              {statusConfig.label}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="order-card-body">
          {/* Shipping Address & Payment */}
          <div className="order-info-section">
            <div className="order-info-item">
              <MapPin className="order-info-icon" />
              <div className="order-info-content">
                <span className="order-info-label">Lieferadresse</span>
                <span className="order-info-value">
                  {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
                </span>
              </div>
            </div>

            <div className="order-info-item">
              <CreditCard className="order-info-icon" />
              <div className="order-info-content">
                <span className="order-info-label">Zahlungsstatus</span>
                <span className={`order-payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>
                  {order.isPaid ? (
                    <>
                      Bezahlt
                      {order.paidAt && ` am ${formatShortDate(order.paidAt)}`}
                    </>
                  ) : (
                    'Ausstehend'
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items Toggle */}
          <div className="order-items-preview">
            <button
              className="order-items-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="order-items-toggle-left">
                <ChevronDown className={`toggle-icon ${isExpanded ? 'rotated' : ''}`} />
                <span className="order-items-toggle-text">
                  {isExpanded ? 'Artikel ausblenden' : 'Artikel anzeigen'}
                </span>
              </div>
              <span className="order-items-count">{order.orderItems.length}</span>
            </button>

            {/* Items List */}
            {isExpanded && (
              <div className="order-items-list">
                {order.orderItems.map((item, index) => (
                  <div key={`${item.product}-${index}`} className="order-item">
                    <div className="order-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <span className="order-item-emoji">📦</span>
                      )}
                    </div>
                    <div className="order-item-details">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-quantity">Menge: {item.qty}</span>
                    </div>
                    <div className="order-item-price">
                      <span className="item-unit-price">€{item.price.toFixed(2)} / Stk.</span>
                      <span className="item-total-price">€{(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
