import express from "express";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// PLACE ORDER
router.post("/", async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const { items, totalAmount } = req.body;

    const order = new Order({
      user: userId,
      items,
      totalAmount
    });

    await order.save();

    res.json(order);

  } catch (error) {

    console.error("Order Error:", error);

    res.status(500).json({ error: error.message });

  }

});



// ADMIN - GET ALL ORDERS
router.get("/", async (req, res) => {

  try {

    const orders = await Order
      .find()
      .populate("user", "name email")
      .populate("items.menuItem", "name price");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// STUDENT ORDERS
router.get("/user/:id", async (req, res) => {

  try {

    const orders = await Order
      .find({ user: req.params.id })
      .populate("items.menuItem", "name price");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// UPDATE STATUS
router.patch("/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

export default router;


router.get("/my-orders", async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const orders = await Order
      .find({ user: decoded.id })
      .populate("items.menuItem", "name price");

    res.json(orders);

  } catch (error) {

    console.error("My Orders Error:", error);

    res.status(500).json({ error: error.message });

  }

});