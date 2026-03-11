"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Icon } from "@iconify/react";

const data = [
  { name: "Desktop", value: 65, color: "#3b82f6", icon: "solar:laptop-bold-duotone" },
  { name: "Mobile", value: 25, color: "#8b5cf6", icon: "solar:smartphone-bold-duotone" },
  { name: "Tablet", value: 10, color: "#10b981", icon: "solar:tablet-bold-duotone" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <span className="text-sm font-medium text-black">{payload[0].name}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Share: <span className="font-bold text-black">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DevicePieChart() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black">Device Breakdown</h3>
        <p className="text-sm text-gray-500">Visitor devices distribution</p>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-black">100%</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</span>
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-3 justify-between">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  <Icon icon={item.icon} width="18" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.value}% users</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
