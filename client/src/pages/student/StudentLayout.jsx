import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* Background Blobs for Atmosphere */}
      <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] -z-10" />
      
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default StudentLayout;