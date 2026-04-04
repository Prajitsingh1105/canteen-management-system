
import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";



connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dwhqr63p4fqxf.cloudfront.net"
  ],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Canteen Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);