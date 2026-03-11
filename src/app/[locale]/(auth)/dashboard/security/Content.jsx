"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SecurityStats from "@/components/security/SecurityStats";
import SecurityEventsChart from "@/components/security/SecurityEventsChart";
import SecurityActivityTable from "@/components/security/SecurityActivityTable";
import DeviceManagement from "@/components/security/DeviceManagement";
import AuditLogModal from "@/components/security/AuditLogModal";
import SecurityScanModal from "@/components/security/SecurityScanModal";

export default function SecurityPage() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Security Center</h1>
          <p className="text-gray-500 mt-1">Monitor your account security, manage devices, and review activity logs.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button 
            onClick={() => setIsAuditOpen(true)}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Icon icon="solar:history-bold-duotone" width="20" />
            Audit Log
          </button>
          <button 
            onClick={() => setIsScanOpen(true)}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Icon icon="solar:shield-check-bold-duotone" width="20" />
            Security Scan
          </button>
        </div>
      </div>

      {/* Stats */}
      <SecurityStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Chart) */}
        <div className="lg:col-span-2">
            <SecurityEventsChart />
        </div>

        {/* Right Column (Activity Table) */}
        <div className="lg:col-span-1">
            <SecurityActivityTable />
        </div>
      </div>

      {/* Device Management & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <DeviceManagement />
        </div>
        
        {/* Recommendations / Actions */}
        <div className="space-y-6">
            <div className="rounded-3xl p-6 text-white relative overflow-hidden h-[280px] flex flex-col justify-between group">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop" 
                        alt="Security Background" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-800/75 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                        <Icon icon="solar:shield-keyhole-bold-duotone" width="24" className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Enhance Protection</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                        Enable Two-Factor Authentication (2FA) to add an extra layer of security to your account.
                    </p>
                </div>
                
                <div className="relative z-10">
                    <button className="w-full bg-white text-blue-900 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">
                        Enable 2FA Now
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100">
                <h3 className="font-bold text-black mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-black transition-colors">
                                <Icon icon="solar:key-minimalistic-square-bold-duotone" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black">Change Password</span>
                        </div>
                        <Icon icon="solar:alt-arrow-right-linear" className="text-[#fff] group-hover:text-black" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-black transition-colors">
                                <Icon icon="solar:bell-bing-bold-duotone" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black">Security Alerts</span>
                        </div>
                        <Icon icon="solar:alt-arrow-right-linear" className="text-[#fff] group-hover:text-black" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-black transition-colors">
                                <Icon icon="solar:settings-bold-duotone" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black">Configure Policy</span>
                        </div>
                        <Icon icon="solar:alt-arrow-right-linear" className="text-[#fff] group-hover:text-black" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Modals */}
      <AuditLogModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
      />

      <SecurityScanModal 
        isOpen={isScanOpen} 
        onClose={() => setIsScanOpen(false)} 
      />
    </div>
  );
}
