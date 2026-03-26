import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orderApi";
import { FiPackage, FiClock, FiCheckCircle, FiActivity } from "react-icons/fi";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case "Preparing": return { color: "text-yellow-400 bg-yellow-400/10", icon: <FiActivity /> };
      case "Ready": return { color: "text-blue-400 bg-blue-400/10", icon: <FiPackage /> };
      case "Completed": return { color: "text-green-400 bg-green-400/10", icon: <FiCheckCircle /> };
      default: return { color: "text-gray-400 bg-gray-400/10", icon: <FiClock /> };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>
        <div className="text-xs text-gray-500 px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase tracking-widest">
          Live Updates Enabled
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-3xl" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const status = getStatusInfo(order.status);
            return (
              <div key={order._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Order ID</span>
                    <p className="text-sm font-mono text-gray-300">#{order._id.slice(-8)}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs ${status.color}`}>
                    {status.icon} {order.status}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-300"><span className="text-indigo-400 font-bold">{item.quantity}x</span> {item.name}</span>
                      <span className="text-gray-400">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-sm text-gray-500">Amount Paid</span>
                  <span className="text-xl font-bold text-white">₹{order.totalAmount}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;