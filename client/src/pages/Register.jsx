import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ College email validation
    if (!email.endsWith("@ietlucknow.ac.in")) {
      alert("Use your college email only");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        role: "student" // 🔥 force student
      });

      alert("Account created successfully");
      navigate("/");

    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl w-[420px] shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Create Student Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="College Email (roll@ietlucknow.ac.in)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* ROLE (FIXED) */}
          <select
            value="student"
            disabled
            className="w-full bg-gray-800 p-3 rounded-lg cursor-not-allowed opacity-70"
          >
            <option value="student">Student</option>
          </select>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </motion.button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </motion.div>

    </div>
  );
}

export default Register;