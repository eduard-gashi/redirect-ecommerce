import mongoose from "mongoose";

// A sub-schema for reviews
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // e.g., 1-5 stars
    comment: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt for each review
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 }, // For inventory management
    reviews: [reviewSchema], // An array of review objects
    numReviews: { type: Number, required: true, default: 0 }, // Total number of reviews
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Product", productSchema);
