"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Icon } from "@iconify/react";

export default function CustomerDistributionChart() {
  const data = [
    { name: 'Enterprise', value: 35, color: '#4f46e5' }, // Indigo
    { name: 'Pro Plan', value: 45, color: '#10b981' },   // Emerald
    { name: 'Starter', value: 20, color: '#f59e0b' },    // Amber
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">Distribution</h2>
        <button className="text-[#fff] hover:text-gray-600">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
               itemStyle={{ color: '#111827', fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-black">24k</span>
          <span className="text-xs text-gray-500 font-medium">Total</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-black">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
