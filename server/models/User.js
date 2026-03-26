import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: false 
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    googleId: {
      type: String
    },

    
    otp: {
      type: String
    },

    otpExpiry: {
      type: Date
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
