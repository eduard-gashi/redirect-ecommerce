import express from 'express';
import Order from '../models/order.js';
import Product from '../models/product.js'; // Ensure Product Model is imported

const router = express.Router();

// Assuming this endpoint is mounted at `/api/orders`
router.post('/', async (req, res) => {
  // 1. Destructure the required order data sent from the frontend
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice = 0,
    shippingPrice = 0,
    paymentResult,
  } = req.body;

  const userId = req.body.user || null;

  // 2. Simple Validation
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items found' });
  }

  try {
    // Get all unique product IDs from the order items
    const productIds = orderItems.map((item) => item.product);

    // Fetch products and their current prices from the database
    const productsFromDb = await Product.find({
      _id: { $in: productIds },
    }).select('_id price countInStock');

    // Create a map for quick lookup: { productId: { price, countInStock } }
    const productMap = productsFromDb.reduce((acc, prod) => {
      acc[prod._id.toString()] = {
        price: prod.price,
        countInStock: prod.countInStock,
      };
      return acc;
    }, {});

    let validatedItemsPrice = 0;
    const validatedOrderItems = [];

    // Re-calculate the itemsPrice and check stock
    for (const item of orderItems) {
      const productInfo = productMap[item.product];

      if (!productInfo) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
      }
      if (productInfo.countInStock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}. Available: ${productInfo.countInStock}`,
        });
      }

      // Calculate the subtotal for this item using the secure DB price
      validatedItemsPrice += productInfo.price * item.qty;

      // Add the item to the validated list, ensuring the correct DB price is used
      validatedOrderItems.push({
        ...item,
        price: productInfo.price, // Overwrite price with secure DB price
        qty: item.qty, // Use the quantity sent
        product: item.product, // Link to the Product ID
      });
    }

    // Final Price Calculation
    const finalItemsPrice = Number(validatedItemsPrice.toFixed(2));
    const finalTaxPrice = Number(taxPrice.toFixed(2));
    const finalShippingPrice = Number(shippingPrice.toFixed(2));
    const finalTotalPrice = Number(
      (finalItemsPrice + finalTaxPrice + finalShippingPrice).toFixed(2),
    );

    // 3. Prepare the new Order document
    const order = new Order({
      user: userId,
      orderItems: validatedOrderItems, // Use the validated items

      // Required Pricing Data (Using validated prices)
      itemsPrice: finalItemsPrice,
      taxPrice: finalTaxPrice,
      shippingPrice: finalShippingPrice,
      totalPrice: finalTotalPrice,

      // Payment and Shipping Details
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,

      // Payment Status
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: paymentResult, // Use the paymentResult sent from onApprove
    });

    // 4. Save the order to MongoDB
    const createdOrder = await order.save();

    // 5. Respond with the created order object
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error saving order to database:', error);
    res.status(500).json({
      message: 'Server Error: Failed to save order.',
      details: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('TRYING TO fetch orders', req.query);
    const userId = req.query.user;
    const orders = userId ? await Order.find({ user: userId }) : await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
