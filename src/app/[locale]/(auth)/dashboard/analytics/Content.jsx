"use client";

import { Icon } from "@iconify/react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import TrafficChart from "@/components/analytics/TrafficChart";
import SourceBarChart from "@/components/analytics/SourceBarChart";
import DevicePieChart from "@/components/analytics/DevicePieChart";
import TopPagesTable from "@/components/analytics/TopPagesTable";

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Analytics Overview</h1>
          <p className="text-gray-500 mt-1">Deep dive into your website performance and audience insights.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DateRangeFilter />
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
            <Icon icon="solar:download-bold-duotone" width="20" />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <AnalyticsStats />

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Traffic Chart - Takes up 2 columns */}
        <div className="xl:col-span-2">
          <TrafficChart />
        </div>
        
        {/* Device Distribution - Takes up 1 column */}
        <div className="xl:col-span-1">
          <DevicePieChart />
        </div>
      </div>

      {/* Secondary Charts & Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Traffic Sources - Takes up 1 column */}
        <div className="xl:col-span-1">
          <SourceBarChart />
        </div>

        {/* Top Pages Table - Takes up 2 columns */}
        <div className="xl:col-span-2">
          <TopPagesTable />
        </div>
      </div>
    </div>
  );
}
