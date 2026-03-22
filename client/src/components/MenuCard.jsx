import { motion } from "framer-motion";
import toast from "react-hot-toast";

function MenuCard({ item, addToCart }) {

  const handleAdd = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (

    <motion.div
      whileHover={{ y: -6 }}
      className="bg-[#1e293b] p-5 rounded-xl shadow-lg border border-gray-700"
    >

      <img
        src={item.image}
        alt={item.name}
        className="rounded-lg mb-3 h-40 w-full object-cover"
      />

      <h2 className="text-xl font-semibold">{item.name}</h2>

      <p className="text-gray-400">₹{item.price}</p>

      <button
        onClick={handleAdd}
        className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 transition py-2 rounded-lg"
      >
        Add to Cart
      </button>

    </motion.div>

  );
}

export default MenuCard;