"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import AutomationStats from "@/components/automation/AutomationStats";
import AutomationPerformanceChart from "@/components/automation/AutomationPerformanceChart";
import ActiveAutomationsList from "@/components/automation/ActiveAutomationsList";
import RecentExecutionsTable from "@/components/automation/RecentExecutionsTable";
import CreateAutomationModal from "@/components/automation/CreateAutomationModal";

export default function AutomationPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Automation Center</h1>
          <p className="text-gray-500 mt-1">Streamline your workflows and monitor automated tasks.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DateRangeFilter />
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#007ce1]/20 w-full sm:w-auto"
          >
            <Icon icon="solar:add-circle-bold-duotone" width="20" />
            New Automation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <AutomationStats />

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 h-full">
          <AutomationPerformanceChart />
        </div>
        <div className="xl:col-span-1 h-full">
          <RecentExecutionsTable />
        </div>
      </div>

      {/* Active Automations Grid */}
      <ActiveAutomationsList />
      
      {/* Create Automation Modal */}
      <CreateAutomationModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
    </div>
  );
}
