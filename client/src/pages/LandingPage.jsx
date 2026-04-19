import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiClock, FiShield, FiBarChart2 } from "react-icons/fi";
import analyticsVideo from "../assets/videos/Analytics.mp4";
import menuVideo from "../assets/videos/Menu.mp4";
import orderVideo from "../assets/videos/Order.mp4";


function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const FeatureCard = ({ icon, title, desc, video }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="rounded-[32px] border border-white/10 bg-[#071027] p-8"
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          {icon}
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>

        <p className="text-gray-400 leading-8 mb-8">
          {desc}
        </p>

        <div className="rounded-2xl overflow-hidden border border-white/5 bg-black/40">
          <div className="aspect-video w-full">
            {video ? (
              <video
                className="w-full h-full object-cover"
                src={video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[11px] tracking-[0.35em] text-gray-500">
                VISUAL PREVIEW
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans selection:bg-indigo-500/30">
      {/* 🌫 BACKGROUND GRADIENT BLOB */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">S</div>
          <span className="text-xl font-bold tracking-tight">Smart<span className="text-indigo-400">Canteen</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Impact</a>
          <Link to="/login" className="text-white bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-lg transition-all border border-white/10">
            Sign In
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              ✨ Revolutionizing Campus Dining
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              Eat Faster. <br />
              <span className="text-indigo-500">Wait Less.</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              The ultimate smart ordering ecosystem for modern campuses. Order ahead, get notified when it's ready, and never stand in a canteen line again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="group bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/25">
                Get Started Now
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-semibold transition-all">
                View Menu
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800"
                alt="App Mockup"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full"><FiCheckCircle className="text-green-500" /></div>
                <div>
                  <p className="text-xs text-gray-400">Order Ready!</p>
                  <p className="text-sm font-bold">Pick up at Counter 2</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 📊 STATS SECTION */}
      <section id="stats" className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Students", val: "10k+" },
            { label: "Orders Served", val: "50k+" },
            { label: "Wait Time Saved", val: "75%" },
            { label: "Partner Outlets", val: "12+" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.val}</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ FEATURES SECTION */}
      {/* ✨ FEATURES SECTION */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Built for Campus Speed</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage orders from the kitchen to the student's hands.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<FiClock className="text-blue-400" size={24} />}
            title="Pre-Order System"
            desc="Order from your classroom and pick up exactly when the bell rings."
            video={orderVideo}
          />

          <FeatureCard
            icon={<FiShield className="text-indigo-400" size={24} />}
            title="Menu Management"
            desc="Add items, update prices, and control availability in real time from one admin dashboard."
            video={menuVideo}
          />

          <FeatureCard
            icon={<FiBarChart2 className="text-purple-400" size={24} />}
            title="Admin Insights"
            desc="Real-time analytics for canteen owners to track peak hours and sales."
            video={analyticsVideo}
          />
        </motion.div>
      </section>

      {/* 🚀 CTA SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your canteen?</h2>
            <Link to="/register" className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95 inline-block">
              Create Your Account
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-8 text-gray-500">
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
        </div>
        <p className="text-gray-600 text-sm">© 2026 Smart Canteen Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -10 }}
      className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.05] transition-all group"
    >
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">{desc}</p>
      <div className="h-32 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">Visual Preview</span>
      </div>
    </motion.div>
  );
}

export default LandingPage;