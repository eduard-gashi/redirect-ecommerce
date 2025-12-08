import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Order } from "../types/order";
import apiClient from '../apiClient';
import OrderSummary from "./OrderSummary";

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
            <ul style={{ padding: 0 }}>
                {orderHistory.map(order => (
                    <OrderSummary key={order._id} order={order} />
                ))}
            </ul>
        </div>
    );
}


export default OrderHistory;