import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import API from "../api/axios";
import { loginUser } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁️ NEW STATE
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleResponse = async (credentialResponse) => {
    try {
      setLoading(true);

      const res = await API.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      const user = res.data.user || res.data;
      const token = res.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/student", { replace: true });
    } catch (err) {
      alert("Google login failed. Use your college email.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!email) return alert("Please enter email first");

    try {
      await API.post("/api/auth/send-otp", { email });
      alert("OTP sent to email");
    } catch {
      alert("Failed to send OTP");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) return alert("Email is required");

    if (role === "student" && !password) {
      return alert("Password is required");
    }

    if (role === "admin" && !otp) {
      return alert("OTP is required");
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password: role === "student" ? password : undefined,
        otp: role === "admin" ? otp : undefined,
        role,
      });

      const user = res.data.user || res.data;
      const token = res.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate(user.role === "admin" ? "/admin" : "/student", {
        replace: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl w-96 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          Canteen Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-lg text-white outline-none"
            required
          />

          {/* 🔐 PASSWORD WITH SHOW/HIDE */}
          {role === "student" && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 p-3 pr-12 rounded-lg text-white"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}

          {role === "admin" && (
            <>
              <button
                type="button"
                onClick={sendOtp}
                className="w-full bg-yellow-500 py-2 rounded-lg font-bold text-black hover:bg-yellow-600 transition"
              >
                Send OTP
              </button>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
                required
              />
            </>
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-lg text-white"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-indigo-500 py-2 rounded-lg text-white hover:bg-indigo-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {role === "student" && (
          <div className="mt-6 flex flex-col items-center border-t border-white/10 pt-6">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onError={() => alert("Google Login Failed")}
            />
          </div>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;