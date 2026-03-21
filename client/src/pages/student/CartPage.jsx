import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";

function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.qty
        })),
        totalAmount: total
      };
      await createOrder(orderData);
      clearCart();
      toast.success("Order placed! Check history for status.");
    } catch (err) {
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FiShoppingBag className="text-indigo-500" /> Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white/5 border border-dashed border-white/10 p-12 rounded-3xl text-center">
              <p className="text-gray-500 mb-4">Nothing here yet!</p>
              <button className="text-indigo-400 font-semibold underline">Back to Menu</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center group hover:bg-white/[0.08] transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">🍲</div>
                   <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-indigo-400 font-medium">₹{item.price}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-black/20 p-2 rounded-xl">
                  <button onClick={() => decreaseQty(item._id)} className="p-1 hover:text-indigo-400 transition-colors"><FiMinus /></button>
                  <span className="w-4 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => increaseQty(item._id)} className="p-1 hover:text-indigo-400 transition-colors"><FiPlus /></button>
                  <button onClick={() => removeItem(item._id)} className="ml-2 text-gray-500 hover:text-red-400 transition-colors"><FiTrash2 size={18} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm border-b border-white/10 pb-4 mb-4">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="flex justify-between text-gray-400"><span>Service Fee</span><span>₹0</span></div>
          </div>
          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total</span>
            <span className="text-indigo-400">₹{total}</span>
          </div>
          <button
            onClick={placeOrder}
            disabled={loading || cart.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;