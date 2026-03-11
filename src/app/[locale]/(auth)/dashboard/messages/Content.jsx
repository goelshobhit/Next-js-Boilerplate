"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import MessageStats from "@/components/messages/MessageStats";
import MessageChart from "@/components/messages/MessageChart";
import MessageTable from "@/components/messages/MessageTable";
import ComposeMessageModal from "@/components/messages/ComposeMessageModal";

export default function MessagesPage() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Messages</h1>
          <p className="text-gray-500 mt-1">Manage your inbox and support tickets.</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeFilter />
          <button 
            onClick={() => setIsComposeOpen(true)}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center gap-2 shadow-none"
          >
            <Icon icon="solar:pen-new-square-bold-duotone" width="20" />
            Compose
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <MessageStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Chart Section */}
        <div className="xl:col-span-4 h-full">
          <MessageChart />
        </div>

        {/* Messages Table Section */}
        <div className="xl:col-span-8 h-full">
          <MessageTable />
        </div>
      </div>

      <ComposeMessageModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </div>
  );
}
