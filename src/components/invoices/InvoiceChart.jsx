"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from "@iconify/react";

const data = [
  { name: 'Jan', issued: 4000, paid: 2400 },
  { name: 'Feb', issued: 3000, paid: 1398 },
  { name: 'Mar', issued: 2000, paid: 9800 },
  { name: 'Apr', issued: 2780, paid: 3908 },
  { name: 'May', issued: 1890, paid: 4800 },
  { name: 'Jun', issued: 2390, paid: 3800 },
  { name: 'Jul', issued: 3490, paid: 4300 },
];

export default function InvoiceChart() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-black">Invoice Analytics</h3>
          <p className="text-sm text-gray-500">Issued vs Paid invoices over time</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
            />
            <CartesianGrid vertical={false} stroke="#f3f4f6" />
            <Area 
              type="monotone" 
              dataKey="issued" 
              stroke="#6366f1" 
              fillOpacity={1} 
              fill="url(#colorIssued)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="paid" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorPaid)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
