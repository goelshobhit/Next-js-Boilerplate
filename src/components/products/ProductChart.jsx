"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Icon } from "@iconify/react";

const data = [
  { name: "Jan", sales: 4000, inventory: 2400 },
  { name: "Feb", sales: 3000, inventory: 1398 },
  { name: "Mar", sales: 2000, inventory: 9800 },
  { name: "Apr", sales: 2780, inventory: 3908 },
  { name: "May", sales: 1890, inventory: 4800 },
  { name: "Jun", sales: 2390, inventory: 3800 },
  { name: "Jul", sales: 3490, inventory: 4300 },
  { name: "Aug", sales: 4200, inventory: 5400 },
  { name: "Sep", sales: 3800, inventory: 4800 },
  { name: "Oct", sales: 5100, inventory: 6200 },
  { name: "Nov", sales: 4800, inventory: 5800 },
  { name: "Dec", sales: 6200, inventory: 7100 },
];

export default function ProductChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-black">Sales vs Inventory</h3>
          <p className="text-sm text-gray-500">Overview of product performance</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="20" />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInventory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "none",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="inventory"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorInventory)"
              name="Inventory"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
