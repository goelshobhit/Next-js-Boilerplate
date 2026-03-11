'use client';

import { Icon } from '@iconify/react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import RevenueChartSection from '@/components/dashboard/RevenueChartSection';
import TrafficSourceSection from '@/components/dashboard/TrafficSourceSection';
import TopPerformersSection from '@/components/dashboard/TopPerformersSection';
import SubscriberGrowthSection from '@/components/dashboard/SubscriberGrowthSection';
import RecentActivitySection from '@/components/dashboard/RecentActivitySection';
import DateRangeFilter from '@/components/dashboard/DateRangeFilter';

export default function DashboardOverview() {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeFilter />
          <button
            type="button"
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center gap-2"
          >
            <Icon icon="solar:export-bold-duotone" width={20} />
            Export
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <RevenueChartSection />
        <TrafficSourceSection />
        <TopPerformersSection />
        <SubscriberGrowthSection />
        <RecentActivitySection />
      </div>
    </div>
  );
}
