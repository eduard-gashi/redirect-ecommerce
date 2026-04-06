import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Produkte abgerufen:", products.length);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Call one product by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Produkt angefordert mit ID:", req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Produkt nicht gefunden" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
