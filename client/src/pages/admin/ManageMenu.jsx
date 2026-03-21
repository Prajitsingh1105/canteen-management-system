import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiBox, FiDollarSign, FiImage } from "react-icons/fi";

const categories = ["All", "Snacks", "Meals", "Drinks"];

function ManageMenuPage() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Snacks" });
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenu(res.data);
    } catch (err) {
      toast.error("Failed to fetch menu");
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return toast.error("Name and Price are required");
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/menu", form);
      toast.success("Item launched to menu! 🚀");
      setForm({ name: "", price: "", image: "", category: "Snacks" });
      fetchMenu();
    } catch (err) {
      toast.error("Failed to add item");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      toast.success("Item removed");
      fetchMenu();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Menu Management</h1>
        <p className="text-gray-500 text-sm">Create, update, and manage your canteen offerings.</p>
      </header>

      {/* 🔥 Modern Add Form */}
      <section className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-indigo-400">
          <FiPlus /> Add New Delicacy
        </h2>
        <form onSubmit={handleAddItem} className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Item Name</label>
            <div className="relative">
              <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Vada Pav" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Price (₹)</label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="number" name="price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="20" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Image URL</label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" name="image" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} placeholder="https://..." className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
            <select name="category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
              <option className="bg-slate-900">Snacks</option>
              <option className="bg-slate-900">Meals</option>
              <option className="bg-slate-900">Drinks</option>
            </select>
          </div>
          <button className="md:col-span-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
            {loading ? "Adding to System..." : "Confirm & Add Item"}
          </button>
        </form>
      </section>

      {/* Grid Display */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full border text-sm transition-all ${selectedCategory === cat ? "bg-white text-black border-white" : "border-white/10 text-gray-500 hover:border-white/30"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.filter(i => selectedCategory === "All" || i.category === selectedCategory).map(item => (
          <div key={item._id} className="group bg-white/[0.02] border border-white/5 p-4 rounded-3xl hover:bg-white/[0.05] transition-all">
            <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
              <img src={item.image || "https://via.placeholder.com/150"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold px-3 py-1 rounded-full">{item.category}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-indigo-400 font-bold">₹{item.price}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-semibold border border-red-500/20">
              <FiTrash2 size={14} /> Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageMenuPage;