import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Produkt nach ID abrufen
// 🔹 ALLE Produkte abrufen
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // ✅ Holt alle Produkte
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 EIN Produkt nach ID abrufen
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produkt nicht gefunden" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Neues Produkt hinzufügen
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
