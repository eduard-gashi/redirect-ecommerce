import express from 'express';
import Order from '../models/order.js';

const router = express.Router();


// Assuming this endpoint is mounted at `/api/orders`
router.post('/', async (req, res) => {
    // 1. Destructure the required order data sent from the frontend (ProductDetail.jsx)
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        totalPrice, 
        itemsPrice, 
        taxPrice = 0, // Default to 0 if not sent
        shippingPrice = 0, // Default to 0 if not sent
        paymentResult 
    } = req.body;

    // 💡 Security Best Practice: Get the user ID from the request object (assuming authentication middleware)
    // const userId = req.user._id; 
    // For demonstration, we'll use a placeholder or assume it's passed in the body (less secure):
    const userId = req.body.user; 
    
    // 2. Simple Validation
    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items found' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated or ID missing' });
    }

    try {
        // 3. Prepare the new Order document based on your Mongoose Schema
        const order = new Order({
            // Required User & Item Data
            user: userId, 
            // ⚠️ FIX: Map 'quantity' back to 'qty' for Mongoose schema
            orderItems: orderItems.map(item => ({
                ...item,
                qty: item.quantity || item.qty, 
                // Ensure product ID is properly set
                product: item.product, 
            })),
            
            // Required Pricing Data (Trusting the frontend for Express Checkout, 
            // but for safety, you should re-calculate itemsPrice on the backend!)
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice, 

            // Payment and Shipping Details
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod, // Should be 'PayPal Express'
            
            // Payment Status (Set immediately to PAID since this route only runs AFTER capture)
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
                id: paymentResult.id,
                status: paymentResult.status,
                update_time: paymentResult.update_time || new Date().toISOString(),
                email_address: paymentResult.email_address || '', 
            },
        });

        // 4. Save the order to MongoDB
        const createdOrder = await order.save();
        
        // 5. Respond with the created order object
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("Error saving order to database:", error);
        res.status(500).json({ 
            message: 'Server Error: Failed to save order.', 
            details: error.message 
        });
    }
});

export default router;