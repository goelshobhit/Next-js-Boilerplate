"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Icon } from "@iconify/react";

const data = [
  { name: "Mon", events: 4, threats: 1 },
  { name: "Tue", events: 3, threats: 0 },
  { name: "Wed", events: 7, threats: 2 },
  { name: "Thu", events: 2, threats: 0 },
  { name: "Fri", events: 5, threats: 1 },
  { name: "Sat", events: 1, threats: 0 },
  { name: "Sun", events: 2, threats: 0 },
];

export default function SecurityEventsChart() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-black">Security Overview</h3>
          <p className="text-sm text-gray-500">Security events and blocked threats over the last 7 days.</p>
        </div>
        <button className="text-[#fff] hover:text-gray-600 p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="events" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorEvents)" 
              name="All Events"
            />
            <Area 
              type="monotone" 
              dataKey="threats" 
              stroke="#EF4444" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorThreats)" 
              name="Threats Blocked"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
