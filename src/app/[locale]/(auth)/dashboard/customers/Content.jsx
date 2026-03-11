"use client";
import { Icon } from "@iconify/react";
import CustomerStatsGrid from "@/components/customers/CustomerStatsGrid";
import CustomerGrowthChart from "@/components/customers/CustomerGrowthChart";
import CustomerDistributionChart from "@/components/customers/CustomerDistributionChart";
import CustomerTable from "@/components/customers/CustomerTable";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";

export default function CustomersPage() {
  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Customers</h1>
          <p className="text-gray-500 mt-1">Manage and analyze your customer base.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DateRangeFilter />
          <button className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 shadow-none w-full sm:w-auto">
            <Icon icon="solar:export-bold-duotone" width="20" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <CustomerStatsGrid />

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <CustomerGrowthChart />
        </div>
        <div className="xl:col-span-1">
          <CustomerDistributionChart />
        </div>
      </div>

      {/* Customers Table */}
      <CustomerTable />
      
    </div>
  );
}
