import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard";
import { useCart } from "../../context/CartContext";
import { getMenu } from "../../api/menuApi";
import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";

const categories = ["All", "Snacks", "Drinks", "Meals", "Desserts"];

function MenuPage() {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenu();
        setMenu(res.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = selectedCategory === "All"
    ? menu
    : menu.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
          Deliciously Fast.
        </h1>
        <p className="text-gray-400">Select your favorites and skip the wait.</p>
      </header>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl transition-all whitespace-nowrap font-medium border ${
                selectedCategory === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search food..." 
            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-indigo-400 animate-pulse">
          <div className="w-5 h-5 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin" />
          Preparing the menu...
        </div>
      ) : (
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <MenuCard key={item._id} item={item} addToCart={addToCart} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default MenuPage;