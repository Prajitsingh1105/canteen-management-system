import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Admin whitelist
const ADMIN_WHITELIST = [
  "admin1@ietlucknow.ac.in",
  "canteen@ietlucknow.ac.in",
  "2400520100016@ietlucknow.ac.in",
  "2400520200008@ietlucknow.ac.in"
];


// REGISTER (STUDENT ONLY)

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Only college email
    if (!email.endsWith("@ietlucknow.ac.in")) {
      return res.status(400).json({
        message: "Use college email only"
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// LOGIN 

router.post("/login", async (req, res) => {
  try {
    const { email, password, role, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // STUDENT LOGIN 
    if (role === "student") {

      if (!email.endsWith("@ietlucknow.ac.in")) {
        return res.status(400).json({
          message: "Use college email only"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password || "");

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // ADMIN LOGIN
    if (role === "admin") {

      if (!ADMIN_WHITELIST.includes(email)) {
        return res.status(403).json({
          message: "Not authorized"
        });
      }

      if (!otp || user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({
          message: "Invalid or expired OTP"
        });
      }

      // clear OTP after use
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// SEND OTP (ADMIN) 

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!ADMIN_WHITELIST.includes(email)) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name: "Admin",
        role: "admin",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // Send Email
    await sendEmail(
      email,
      "Your OTP for Canteen Login",
      `Your OTP is: ${otp}. It will expire in 5 minutes.`
    );

    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 


// GOOGLE OAUTH 
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, sub } = payload;

    // Only college email
    if (!email.endsWith("@ietlucknow.ac.in")) {
      return res.status(400).json({
        message: "Use college email only"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId: sub,
        role: "student",
        isVerified: true
      });

      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
