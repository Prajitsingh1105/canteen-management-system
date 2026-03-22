import { useEffect, useState } from "react"; // Added hooks
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiGrid, 
  FiShoppingCart, 
  FiClock, 
  FiLogOut, 
  FiUser, 
  FiZap 
} from "react-icons/fi";
import toast from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student User");

  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        
        setUserName(user.name || user.fullName || "Student User");
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out safely");
    navigate("/login");
  };

  const navItems = [
    { name: "Explore Menu", path: "/student/menu", icon: <FiGrid /> },
    { name: "My Cart", path: "/student/cart", icon: <FiShoppingCart /> },
    { name: "Order History", path: "/student/orders", icon: <FiClock /> },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#020617] border-r border-white/5 p-6 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-[-10%] left-[-20%] w-40 h-40 bg-indigo-600/10 blur-[80px] rounded-full -z-10" />

      <div>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <FiZap className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">
              FLASH<span className="text-indigo-500">EATS</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">
              Student Hub
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-400" : ""}`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm tracking-wide">
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute left-[-2px] w-[4px] h-6 bg-indigo-500 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white border-2 border-slate-900 shrink-0">
            <FiUser />
          </div>
          <div className="overflow-hidden">
            {/* 🎯 Real name displayed here */}
            <p className="text-sm font-bold text-white truncate">
              {userName}
            </p>
            <p className="text-[10px] text-gray-500 truncate">Student Account</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 group"
        >
          <FiLogOut className="text-lg group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;