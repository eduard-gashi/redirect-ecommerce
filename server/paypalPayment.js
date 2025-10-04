import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const PAYPAL_API = 'https://api-m.paypal.com'; // Oder 'https://api-m.sandbox.paypal.com'

// Hilfsfunktion zum Abrufen des Access Tokens
const generateAccessToken = async () => {
    const auth = Buffer.from(
        process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET_KEY
    ).toString('base64');
    
    const response = await axios({
        url: `${PAYPAL_API}/v1/oauth2/token`,
        method: 'post',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials',
    });

    return response.data.access_token;
};


// 💡 Endpunkt zum Abschließen der Zahlung (Capture)
router.post('/capture-order', async (req, res) => {
    const { orderID } = req.body; // Vom Frontend gesendete Order ID
    
    try {
        const accessToken = await generateAccessToken();

        // PayPal API aufrufen, um die Zahlung abzuschließen
        const captureResponse = await axios({
            url: `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // WICHTIG: Hier die Bestellung in deiner Datenbank speichern und dem Nutzer antworten
        const paymentDetails = captureResponse.data;
        
        if (paymentDetails.status === 'COMPLETED') {
            // Zahlung war erfolgreich!
            // Hier die Logik zum Speichern der Bestellung ausführen
            res.status(200).json({ status: 'success', paymentDetails });
        } else {
             // Zahlung nicht erfolgreich
            res.status(400).json({ status: 'failed', paymentDetails });
        }
        
    } catch (error) {
        console.error("PayPal Capture Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Zahlungsbestätigung fehlgeschlagen." });
    }
});

export default router;