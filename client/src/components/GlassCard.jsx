import { motion } from "framer-motion";

function GlassCard({ children }) {

  return (

    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg"
    >
      {children}
    </motion.div>

  );
}

export default GlassCard;
