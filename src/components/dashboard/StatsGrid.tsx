'use client';

import { Icon } from '@iconify/react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    trend: 'up' as const,
    icon: 'solar:dollar-minimalistic-bold-duotone',
    color: 'text-black',
    bg: 'bg-blue-50',
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: '+5.2%',
    trend: 'up' as const,
    icon: 'solar:users-group-rounded-bold-duotone',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    title: 'New Orders',
    value: '1,245',
    change: '-2.4%',
    trend: 'down' as const,
    icon: 'solar:bag-3-bold-duotone',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'Growth Rate',
    value: '24.5%',
    change: '+8.1%',
    trend: 'up' as const,
    icon: 'solar:chart-2-bold-duotone',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon icon={stat.icon} width={24} />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
              }`}
            >
              {stat.trend === 'up' ? '+' : ''}
              {stat.change}
              <Icon
                icon={stat.trend === 'up' ? 'solar:arrow-right-up-linear' : 'solar:arrow-right-down-linear'}
                width={12}
              />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-black mt-1">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
