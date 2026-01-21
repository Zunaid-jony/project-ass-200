import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const BRAND = "#1089bc";

export const DashboardHome = () => {
  /* ===== Weekly Orders & Revenue ===== */
  const trendData = [
    { day: "Mon", orders: 12, revenue: 4200 },
    { day: "Tue", orders: 18, revenue: 6100 },
    { day: "Wed", orders: 10, revenue: 3500 },
    { day: "Thu", orders: 22, revenue: 8200 },
    { day: "Fri", orders: 16, revenue: 5900 },
    { day: "Sat", orders: 28, revenue: 10400 },
    { day: "Sun", orders: 20, revenue: 7600 },
  ];

  /* ===== Product Category Share ===== */
  const categoryData = [
    { name: "Baby Food", value: 32 },
    { name: "Diapers", value: 26 },
    { name: "Toys", value: 18 },
    { name: "Clothing", value: 24 },
  ];

  const pieColors = ["#1089bc", "#22c55e", "#f59e0b", "#ec4899"];

  return (
    <div className="space-y-6 p-6">
      {/* ===== Header ===== */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>
        <p className="text-slate-500">
          Overview of sales, orders & products
        </p>
      </div>

      {/* ===== KPI Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Orders", value: "1,245" },
          { title: "Total Revenue", value: "৳ 3,45,200" },
          { title: "Active Products", value: "286" },
          { title: "Happy Customers", value: "1,020+" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border shadow-sm p-5"
          >
            <p className="text-sm text-slate-500">{item.title}</p>
            <p
              className="text-2xl font-extrabold mt-1"
              style={{ color: BRAND }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders & Revenue Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700">
              Orders & Revenue (Last 7 Days)
            </h3>
            <span className="text-xs text-slate-500">Weekly</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke={BRAND}
                  strokeWidth={3}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Donut */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700">
              Product Categories
            </h3>
            <span className="text-xs text-slate-500">Share</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== Recent Orders & Low Stock ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">
            Recent Orders
          </h3>

          <div className="space-y-3">
            {[
              { id: "#ORD-1023", customer: "Rahim", amount: "৳ 2,300", status: "Paid" },
              { id: "#ORD-1022", customer: "Karim", amount: "৳ 1,150", status: "Pending" },
              { id: "#ORD-1021", customer: "Sadia", amount: "৳ 3,800", status: "Delivered" },
            ].map((o, i) => (
              <div
                key={i}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <div>
                  <p className="font-semibold text-slate-800">{o.id}</p>
                  <p className="text-xs text-slate-500">
                    {o.customer} • {o.status}
                  </p>
                </div>
                <p className="font-bold text-slate-800">{o.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">
            Low Stock Products
          </h3>

          <div className="space-y-3">
            {[
              { name: "Baby Diapers (M)", qty: 8 },
              { name: "Milk Powder 1+", qty: 5 },
              { name: "Baby Lotion", qty: 6 },
            ].map((p, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-600">{p.name}</span>
                <span className="font-bold text-red-500">
                  {p.qty} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Customers Table ===== */}
      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">
          Recent Customers
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>Orders</th>
                <th>Last Purchase</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                { name: "Rahim", orders: 6, date: "Today", status: "Active" },
                { name: "Karim", orders: 3, date: "Yesterday", status: "Active" },
                { name: "Sadia", orders: 9, date: "2 days ago", status: "VIP" },
              ].map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{row.name}</td>
                  <td>{row.orders}</td>
                  <td>{row.date}</td>
                  <td>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          row.status === "VIP"
                            ? "rgba(16,137,188,.12)"
                            : "#f1f5f9",
                        color: BRAND,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
