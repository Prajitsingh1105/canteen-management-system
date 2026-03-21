import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiClock, FiUser, FiHash } from "react-icons/fi";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data.reverse()); // Show newest first
    } catch (err) { toast.error("Sync Error"); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}`, { status });
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch { toast.error("Failed to update status"); }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Kitchen Pipeline</h1>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 italic">● Preparing</span>
          <span className="flex items-center gap-1 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20 italic">● Ready</span>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400">
                    <FiUser />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{order.user?.name || "Anonymous Student"}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{order.user?.email}</p>
                  </div>
                </div>
                <div className="space-y-1 pl-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-300">
                      <span className="text-indigo-500 font-bold">{item.quantity}x</span> {item.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-right">
                  <p className="text-2xl font-black text-white">₹{order.totalAmount}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'Completed' ? 'text-green-500' : 'text-indigo-400 animate-pulse'}`}>
                    {order.status}
                  </p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {['Preparing', 'Ready', 'Completed'].map(s => (
                    <button 
                      key={s}
                      onClick={() => updateStatus(order._id, s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        order.status === s ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white/[0.02] px-6 py-3 border-t border-white/5 flex justify-between items-center">
               <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1"><FiHash /> {order._id}</span>
               <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1"><FiClock /> {new Date(order.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminOrdersPage;