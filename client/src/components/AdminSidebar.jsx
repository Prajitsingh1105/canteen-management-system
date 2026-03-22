import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiDatabase, 
  FiActivity, 
  FiPieChart, 
  FiLogOut, 
  FiShield, 
  FiSettings 
} from "react-icons/fi";
import toast from "react-hot-toast";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Admin session terminated");
    navigate("/login");
  };

  const navItems = [
    { name: "Manage Menu", path: "/admin/menu", icon: <FiDatabase /> },
    { name: "Live Pipeline", path: "/admin/orders", icon: <FiActivity />, badge: "LIVE" },
    { name: "Intelligence", path: "/admin/analytics", icon: <FiPieChart /> },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#020617] border-r border-white/5 p-6 flex flex-col justify-between overflow-hidden">
      {/* Red/Indigo Glow for Admin Mode */}
      <div className="absolute top-[-5%] left-[-10%] w-44 h-44 bg-red-600/5 blur-[80px] rounded-full -z-10" />

      <div>
        {/* Admin Header */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <FiShield className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase">
              CORE<span className="text-indigo-500">ADMIN</span>
            </h1>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" /> Privileged Access
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-white/[0.03] text-white border border-white/10 shadow-xl" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl transition-transform group-hover:rotate-12 transition-transform">
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">
                  {item.name}
                </span>
              </div>

              {/* Special Badge for Live Orders */}
              {item.badge && (
                <span className="text-[9px] bg-red-600/20 text-red-500 px-2 py-0.5 rounded-md font-black border border-red-500/20 animate-pulse">
                  {item.badge}
                </span>
              )}

              {/* Active Slide Indicator */}
              <NavLink to={item.path}>
                {({ isActive }) => isActive && (
                  <motion.div 
                    layoutId="adminIndicator"
                    className="absolute inset-0 border-2 border-indigo-500/30 rounded-2xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin Footer Controls */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-500 shadow-lg shadow-red-950/20"
        >
          <FiLogOut className="text-lg" />
          <span className="font-black text-xs uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
