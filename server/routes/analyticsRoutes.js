import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


// 1. Dashboard Summary

router.get("/summary", async (req, res) => {

  try {

    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const avgOrderValue =
      totalOrders > 0
        ? totalRevenue / totalOrders
        : 0;

    res.json({
      totalOrders,
      totalRevenue,
      avgOrderValue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});



// 2. Weekly Orders + Revenue

router.get("/weekly", async (req, res) => {

  try {

    const weeklyData = await Order.aggregate([

      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },

          orders: { $sum: 1 },

          revenue: { $sum: "$totalAmount" }
        }
      },

      {
        $sort: { "_id": 1 }
      }

    ]);

    res.json(weeklyData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});



// 3. Top Selling Items

router.get("/top-items", async (req, res) => {

  try {

    const items = await Order.aggregate([

      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.name",

          totalSold: { $sum: "$items.quantity" },

          revenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"]
            }
          }
        }
      },

      {
        $sort: { totalSold: -1 }
      },

      {
        $limit: 5
      }

    ]);

    res.json(items);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});



// 4. Recent Orders (Admin Panel)

router.get("/recent-orders", async (req, res) => {

  try {

    const orders = await Order
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


export default router;