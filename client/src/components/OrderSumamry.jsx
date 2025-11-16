import React from "react";

function OrderSummary({ order }) {
    return (
        <div className="order-card">
            <div className="order-info-row">
                <div>
                    <span className="order-label">Bestelldatum<br /></span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                    <span className="order-label">Gesamtpreis<br /></span>
                    <span>{order.totalPrice?.toFixed(2)} €</span>
                </div>
                <div>
                    <span className="order-label">Lieferadresse<br /></span>
                    <span>
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                    </span>
                </div>
                <div>
                    <span className="order-label">Lieferstatus<br /></span>
                    <span style={{ color: order.isDelivered ? "green" : "orange" }}>
                        {order.isDelivered ? "Zugestellt" : "Offen"}
                    </span>
                </div>
            </div>
            {/* Produkte unter der Zeile */}
            <div className="order-products">
                {order.orderItems.map(item => (
                    <div className="order-product-item" key={item.product}>
                        <img src={item.image} alt={item.name} className="order-product-img" />
                        <div>
                            <strong>{item.name}</strong>
                            <div>Menge: {item.qty} × {item.price.toFixed(2)} €</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderSummary;
