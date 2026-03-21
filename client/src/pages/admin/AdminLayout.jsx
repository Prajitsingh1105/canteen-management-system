import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* Admin specific glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10" />
      
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default AdminLayout;