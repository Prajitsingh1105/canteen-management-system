import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiBox, FiDollarSign, FiImage } from "react-icons/fi";

const categories = ["All", "Snacks", "Meals", "Drinks"];

function ManageMenuPage() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "Snacks",
  });
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/api/menu");
      setMenu(res.data);
    } catch (err) {
      toast.error("Failed to fetch menu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price)
      return toast.error("Name and Price are required");

    try {
      setLoading(true);
      await api.post("/api/menu", form);
      toast.success("Item launched to menu! 🚀");
      setForm({ name: "", price: "", image: "", category: "Snacks" });
      fetchMenu();
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await api.delete(`/api/menu/${id}`);
      toast.success("Item removed");
      fetchMenu();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Menu Management
        </h1>
        <p className="text-gray-500 text-sm">
          Create, update, and manage your canteen offerings.
        </p>
      </header>

      {/* Add Form */}
      <section className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-indigo-400">
          <FiPlus /> Add New Delicacy
        </h2>

        <form onSubmit={handleAddItem} className="grid md:grid-cols-4 gap-6">
          <input
            type="text"
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="input"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="input"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input"
          >
            <option>Snacks</option>
            <option>Meals</option>
            <option>Drinks</option>
          </select>

          <button className="md:col-span-4 bg-indigo-600 text-white py-3 rounded-xl">
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </section>

      {/* Categories */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === cat
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu
          .filter(
            (i) => selectedCategory === "All" || i.category === selectedCategory
          )
          .map((item) => (
            <div
              key={item._id}
              className="bg-white/[0.02] p-4 rounded-2xl border border-white/10"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover rounded-xl"
              />

              <div className="flex justify-between mt-3">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 w-full bg-red-500/20 text-red-400 py-2 rounded-lg"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ManageMenuPage;