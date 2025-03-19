import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  email: String,
  items: [{ id: Number, name: String, quantity: Number }],
});
const Order = mongoose.model("Order", OrderSchema);

// Create Order API
app.post("/orders", async (req, res) => {
  const { email, items } = req.body;
  if (!email || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  const newOrder = new Order({ email, items });
  await newOrder.save();
  res.json({ message: "Order successfully placed" });
});

// Fetch Orders (for Admin)
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));