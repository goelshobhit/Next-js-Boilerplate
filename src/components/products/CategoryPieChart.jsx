"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Icon } from "@iconify/react";

const data = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home", value: 300 },
  { name: "Sports", value: 200 },
];

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

export default function CategoryPieChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-black">Categories</h3>
          <p className="text-sm text-gray-500">Distribution by category</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="20" />
        </button>
      </div>

      <div className="h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
            />
            <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-sm text-gray-500 font-medium ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-4">
            <span className="text-3xl font-bold text-black">1.2k</span>
            <p className="text-xs text-gray-500 font-medium">Items</p>
        </div>
      </div>
    </div>
  );
}
