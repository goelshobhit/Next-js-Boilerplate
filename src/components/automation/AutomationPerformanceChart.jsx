"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", tasks: 1200, saved: 8 },
  { name: "Tue", tasks: 1500, saved: 10 },
  { name: "Wed", tasks: 1100, saved: 7 },
  { name: "Thu", tasks: 1800, saved: 12 },
  { name: "Fri", tasks: 2000, saved: 14 },
  { name: "Sat", tasks: 800, saved: 5 },
  { name: "Sun", tasks: 950, saved: 6 },
  { name: "Mon", tasks: 1300, saved: 9 },
  { name: "Tue", tasks: 1600, saved: 11 },
  { name: "Wed", tasks: 1400, saved: 9 },
  { name: "Thu", tasks: 1900, saved: 13 },
  { name: "Fri", tasks: 2200, saved: 15 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 rounded-xl">
        <p className="text-sm font-semibold text-black mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-500 capitalize">{entry.name === 'tasks' ? 'Tasks Executed' : 'Hours Saved'}:</span>
              <span className="font-medium text-black">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AutomationPerformanceChart() {
  const [timeRange, setTimeRange] = useState("Weekly");

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-black">Performance Overview</h3>
          <p className="text-sm text-gray-500">Tasks executed vs time saved</p>
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
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="tasks" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTasks)" 
            />
            <Area 
              type="monotone" 
              dataKey="saved" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSaved)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
