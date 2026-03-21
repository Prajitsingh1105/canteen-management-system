import { useEffect, useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie,
  ComposedChart, Legend, CartesianGrid
} from "recharts";
import { getSummary, getWeeklyAnalytics } from "../../api/analyticsApi";
import { FiTrendingUp, FiUsers, FiShoppingBag, FiActivity, FiPieChart, FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";

function AnalyticsPage() {
  const [summary, setSummary] = useState({});
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for complex charts (Integrate with your backend later)
  const hourlyData = [
    { hour: '9am', orders: 12, revenue: 400 },
    { hour: '11am', orders: 45, revenue: 1200 },
    { hour: '1pm', orders: 89, revenue: 3200 },
    { hour: '3pm', orders: 34, revenue: 900 },
    { hour: '5pm', orders: 20, revenue: 600 },
  ];

  const categoryData = [
    { name: 'Snacks', value: 400, color: '#6366f1' },
    { name: 'Meals', value: 300, color: '#8b5cf6' },
    { name: 'Drinks', value: 200, color: '#ec4899' },
    { name: 'Desserts', value: 100, color: '#f43f5e' },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryRes, weeklyRes] = await Promise.all([getSummary(), getWeeklyAnalytics()]);
        setSummary(summaryRes.data);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        setWeekData(weeklyRes.data.map(d => ({
          day: days[d._id - 1],
          orders: d.orders,
          revenue: d.revenue,
          avg: d.revenue / (d.orders || 1)
        })));
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-10 text-indigo-400 animate-pulse font-mono">INITIALIZING NEURAL ENGINE...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* 🚀 HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">SYSTEM <span className="text-indigo-500 text-outline">INSIGHTS</span></h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">Canteen Operations Control v2.4</p>
        </div>
        <div className="flex gap-3 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20">Real-time</button>
          <button className="px-4 py-2 text-gray-400 hover:text-white text-xs font-bold transition-colors">Historical</button>
        </div>
      </header>

      {/* 📊 TOP LEVEL STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FiShoppingBag />} label="Throughput" value={summary.totalOrders} trend="+14%" color="indigo" />
        <StatCard icon={<FiActivity />} label="Revenue Flow" value={`₹${summary.totalRevenue}`} trend="+8.2%" color="green" />
        <StatCard icon={<FiTrendingUp />} label="Ticket Size" value={`₹${Math.round(summary.avgOrderValue || 0)}`} trend="-2%" color="blue" />
        <StatCard icon={<FiUsers />} label="Footfall" value="1.2k" trend="+24%" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 📉 COMPLEX CHART 1: COMPOSED REVENUE & ORDERS */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2"><FiBarChart2 className="text-indigo-400" /> Performance Matrix</h2>
            <span className="text-[10px] text-gray-500 font-mono">REVENUE VS VOLUME</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={weekData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis yAxisId="left" hide />
              <YAxis yAxisId="right" orientation="right" hide />
              <Tooltip 
                contentStyle={{backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px'}}
                itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px', fontSize: '12px'}} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#fbbf24" strokeWidth={4} dot={{r: 6, fill: '#fbbf24', strokeWidth: 2, stroke: '#020617'}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 🍩 CHART 2: CATEGORY SPLIT (PIE) */}
        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem]">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><FiPieChart className="text-pink-500" /> Category Affinity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={80}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            {categoryData.map(item => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} /> {item.name}
                </span>
                <span className="font-bold text-white">{(item.value/10).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 🔥 CHART 3: PEAK HOURS (AREA CHART) */}
        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem]">
          <h2 className="text-xl font-bold mb-6 italic text-gray-400">Traffic Density</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip />
              <Area type="stepAfter" dataKey="orders" stroke="#22c55e" fill="url(#colorWave)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-600 mt-4 text-center uppercase tracking-widest">Peak load detected at 1:00 PM</p>
        </div>

        {/* 📊 CHART 4: WEEKLY EFFICIENCY (VERTICAL BAR) */}
        <div className="bg-indigo-600/5 border border-indigo-500/10 p-8 rounded-[2.5rem]">
          <h2 className="text-xl font-bold mb-6">Efficiency Pulse</h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {weekData.map((d, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(d.revenue / 5000) * 100}%` }}
                transition={{ delay: i * 0.1 }}
                className="w-full bg-indigo-500/40 rounded-t-lg relative group cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">₹{d.revenue}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {weekData.map(d => <span key={d.day} className="text-[10px] font-bold text-gray-500 uppercase">{d.day}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }) {
  const themes = {
    indigo: "from-indigo-500/20 to-transparent border-indigo-500/20 text-indigo-400",
    green: "from-green-500/20 to-transparent border-green-500/20 text-green-400",
    blue: "from-blue-500/20 to-transparent border-blue-500/20 text-blue-400",
    purple: "from-purple-500/20 to-transparent border-purple-500/20 text-purple-400",
  };
  return (
    <div className={`bg-gradient-to-br ${themes[color]} border p-6 rounded-[2rem] hover:scale-[1.02] transition-transform`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-black/20 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{label}</p>
      <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
    </div>
  );
}

export default AnalyticsPage;