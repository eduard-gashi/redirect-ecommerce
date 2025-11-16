import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Order } from "../types/order";
import apiClient from '../apiClient';

function OrderHistory() {
    const { state, dispatch } = useContext(AuthContext);
    const userInfo = state;
    const [orderHistory, setOrderHistory] = useState<List<Order>>([]);
    
    useEffect(() => {
    }, [userInfo]);

    return (
        <div>
            Hallo
        </div>
    );

}

export default OrderHistory;