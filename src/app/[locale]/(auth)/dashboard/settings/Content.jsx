"use client";
import { useState, useEffect, Suspense } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import ProfileSection from "@/components/settings/ProfileSection";
import NotificationSection from "@/components/settings/NotificationSection";
import BillingSection from "@/components/settings/BillingSection";
import SecuritySection from "@/components/settings/SecuritySection";

const tabs = [
  { id: "profile", label: "Profile", icon: "solar:user-circle-bold-duotone" },
  { id: "notifications", label: "Notifications", icon: "solar:bell-bing-bold-duotone" },
  { id: "billing", label: "Billing & Plan", icon: "solar:card-bold-duotone" },
  { id: "security", label: "Security", icon: "solar:shield-keyhole-bold-duotone" },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and configurations.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#007ce1] text-white shadow-lg shadow-[#007ce1]/20"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <Icon icon={tab.icon} width="20" className={activeTab === tab.id ? "text-blue-400" : "text-[#fff]"} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "notifications" && <NotificationSection />}
        {activeTab === "billing" && <BillingSection />}
        {activeTab === "security" && <SecuritySection />}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
