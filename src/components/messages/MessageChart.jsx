"use client";

import { Icon } from "@iconify/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', received: 45, sent: 32 },
  { name: 'Tue', received: 52, sent: 45 },
  { name: 'Wed', received: 38, sent: 35 },
  { name: 'Thu', received: 65, sent: 55 },
  { name: 'Fri', received: 48, sent: 42 },
  { name: 'Sat', received: 25, sent: 20 },
  { name: 'Sun', received: 30, sent: 28 },
];

export default function MessageChart() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-black">Message Volume</h3>
          <p className="text-sm text-gray-500">Weekly incoming vs outgoing messages</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0',
                boxShadow: 'none' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="received" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorReceived)" 
              name="Received"
            />
            <Area 
              type="monotone" 
              dataKey="sent" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSent)" 
              name="Sent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
