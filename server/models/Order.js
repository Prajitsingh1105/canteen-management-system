import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({

  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem"
  },

  name: String,

  price: Number,

  quantity: Number

});

const orderSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Placed", "Preparing", "Ready", "Completed"],
      default: "Placed"
    }

  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;