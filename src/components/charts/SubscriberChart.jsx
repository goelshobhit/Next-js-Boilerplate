"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Sun', value: 1200 },
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 3874 },
  { name: 'Wed', value: 2800 },
  { name: 'Thu', value: 3200 },
  { name: 'Fri', value: 2100 },
  { name: 'Sat', value: 1800 },
];

export default function SubscriberChart() {
  return (
    <div className="w-full h-[250px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={32}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <Tooltip 
            cursor={{ fill: '#f9fafb', radius: 8 }}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none', padding: '10px 16px' }}
          />
          <Bar dataKey="value" radius={[8, 8, 8, 8]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Tue' ? '#7c3aed' : '#e5e7eb'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
