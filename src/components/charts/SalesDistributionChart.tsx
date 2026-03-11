'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Website', value: 374.82, color: '#4f46e5' },
  { name: 'Mobile App', value: 241.6, color: '#14b8a6' },
  { name: 'Other', value: 213.42, color: '#e5e7eb' },
];

export function SalesDistributionChart() {
  return (
    <div className="w-full h-[250px] relative flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
