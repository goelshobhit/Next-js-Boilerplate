'use client';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value1: 1500, value2: 1200, value3: 800, value4: 2000, value5: 1800 },
  { name: 'Feb', value1: 1800, value2: 1400, value3: 900, value4: 2200, value5: 2000 },
  { name: 'Mar', value1: 2200, value2: 1600, value3: 1100, value4: 2400, value5: 2300 },
  { name: 'Apr', value1: 1900, value2: 1300, value3: 950, value4: 2100, value5: 2100 },
  { name: 'May', value1: 2400, value2: 1800, value3: 1200, value4: 2600, value5: 2500 },
  { name: 'Jun', value1: 2100, value2: 1500, value3: 1000, value4: 2300, value5: 2200 },
  { name: 'Jul', value1: 2600, value2: 1900, value3: 1300, value4: 2800, value5: 2700 },
  { name: 'Aug', value1: 2300, value2: 1700, value3: 1150, value4: 2500, value5: 2400 },
  { name: 'Sep', value1: 2800, value2: 2100, value3: 1400, value4: 3000, value5: 2900 },
  { name: 'Oct', value1: 2500, value2: 1800, value3: 1250, value4: 2700, value5: 2600 },
  { name: 'Nov', value1: 2000, value2: 1500, value3: 1000, value4: 2200, value5: 2100 },
  { name: 'Dec', value1: 3200, value2: 2400, value3: 1600, value4: 3400, value5: 3300 },
];

export function SalesChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={20}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
          />
          <Bar dataKey="value1" stackId="a" fill="#4f46e5" radius={[0, 0, 4, 4]} />
          <Bar dataKey="value2" stackId="a" fill="#6366f1" />
          <Bar dataKey="value3" stackId="a" fill="#818cf8" />
          <Bar dataKey="value4" stackId="a" fill="#a5b4fc" />
          <Bar dataKey="value5" stackId="a" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
