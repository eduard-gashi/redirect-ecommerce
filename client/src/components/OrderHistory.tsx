import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Order } from "../types/order";
import apiClient from '../apiClient';

function OrderHistory() {
    const { state, dispatch } = useContext(AuthContext);
    const userInfo = state.userInfo;
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Trying ot fetch orders");
                const { data } = await apiClient.get(`/orders?user=${userInfo?._id}`);
                console.log("DATA", data);
                setOrderHistory(data);
            } catch (err) {
                console.error("Error while loading the product:", err);
            }
        };
        fetchUser();
    }, [userInfo]);

    console.log("ORDER HISTORY", orderHistory);

    if (!orderHistory.length) {
        return <div>Keine Bestellungen gefunden.</div>;
    }

    return (
        <div>
            <h2><strong>Meine Bestellungen</strong></h2>
            <ul style={{ padding: 0 }}>
                {orderHistory.map(order => (
                    <li key={order._id} style={{
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        marginBottom: 20,
                        padding: 20,
                        listStyle: "none",
                        background: "#fafafa"
                    }}>
                        <div><strong>Bestelldatum:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                        <div><strong>Gesamtpreis:</strong> {order.totalPrice.toFixed(2)}€</div>
                        <div><strong>Bezahlstatus:</strong> {order.isPaid ? "Bezahlt" : "Offen"}</div>
                        <div><strong>Zahlungsart:</strong> {order.paymentMethod}</div>
                        <div><strong>Lieferstatus:</strong> {order.isDelivered ? "Zugestellt" : "Offen"}</div>
                        <div>
                            <strong>Produkte:</strong>
                            <ul>
                                {order.orderItems.map(item => (
                                    <li key={item.product}>
                                        {item.name} – {item.qty} × {item.price.toFixed(2)}€
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <strong>Lieferadresse:</strong>
                            {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default OrderHistory;