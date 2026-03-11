"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Icon } from "@iconify/react";

const data = [
  { name: "Mon", visits: 4000, views: 2400 },
  { name: "Tue", visits: 3000, views: 1398 },
  { name: "Wed", visits: 2000, views: 9800 },
  { name: "Thu", visits: 2780, views: 3908 },
  { name: "Fri", visits: 1890, views: 4800 },
  { name: "Sat", visits: 2390, views: 3800 },
  { name: "Sun", visits: 3490, views: 4300 },
  { name: "Mon", visits: 4000, views: 2400 },
  { name: "Tue", visits: 3000, views: 1398 },
  { name: "Wed", visits: 2000, views: 9800 },
  { name: "Thu", visits: 2780, views: 3908 },
  { name: "Fri", visits: 1890, views: 4800 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-sm font-semibold text-black mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-500 capitalize">{entry.name}:</span>
              <span className="font-medium text-black">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function TrafficChart() {
  const [timeRange, setTimeRange] = useState("Weekly");

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-black">Traffic Overview</h3>
          <p className="text-sm text-gray-500">Compare visits vs page views over time</p>
        </div>
        <div className="flex bg-gray-50 rounded-xl p-1">
          {["Daily", "Weekly", "Monthly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                timeRange === range
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVisits)" 
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorViews)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
