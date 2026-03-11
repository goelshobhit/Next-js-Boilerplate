"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from "@iconify/react";

export default function CustomerGrowthChart() {
  const data = [
    { name: 'Jan', newCustomers: 400, active: 2400 },
    { name: 'Feb', newCustomers: 300, active: 2210 },
    { name: 'Mar', newCustomers: 500, active: 2290 },
    { name: 'Apr', newCustomers: 280, active: 2000 },
    { name: 'May', newCustomers: 590, active: 2181 },
    { name: 'Jun', newCustomers: 430, active: 2500 },
    { name: 'Jul', newCustomers: 600, active: 2800 },
    { name: 'Aug', newCustomers: 550, active: 3000 },
    { name: 'Sep', newCustomers: 700, active: 3200 },
    { name: 'Oct', newCustomers: 800, active: 3500 },
    { name: 'Nov', newCustomers: 750, active: 3800 },
    { name: 'Dec', newCustomers: 900, active: 4200 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-black">Customer Growth</h2>
          <p className="text-sm text-gray-500">New vs Active customers over time</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Area type="monotone" dataKey="active" name="Active Customers" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
            <Area type="monotone" dataKey="newCustomers" name="New Customers" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
