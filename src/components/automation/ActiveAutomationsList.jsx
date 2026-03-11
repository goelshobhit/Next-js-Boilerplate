import { useState } from "react";
import { Icon } from "@iconify/react";
import EditAutomationModal from "./EditAutomationModal";
import AutomationLogsModal from "./AutomationLogsModal";

const initialAutomations = [
  {
    id: 1,
    title: "Welcome Email Sequence",
    description: "Send personalized welcome emails to new subscribers after signup.",
    status: "active",
    runs: "12.5K",
    successRate: "99.9%",
    icon: "solar:letter-bold-duotone",
    color: "blue",
  },
  {
    id: 2,
    title: "Invoice Reminders",
    description: "Automatically send reminders for unpaid invoices 3 days before due date.",
    status: "active",
    runs: "840",
    successRate: "98.5%",
    icon: "solar:bill-list-bold-duotone",
    color: "purple",
  },
  {
    id: 3,
    title: "Lead Scoring",
    description: "Calculate and update lead scores based on user activity and engagement.",
    status: "paused",
    runs: "5.2K",
    successRate: "99.2%",
    icon: "solar:star-bold-duotone",
    color: "orange",
  },
  {
    id: 4,
    title: "Social Media Auto-Post",
    description: "Schedule and publish content across multiple social platforms.",
    status: "active",
    runs: "3.1K",
    successRate: "97.8%",
    icon: "solar:share-bold-duotone",
    color: "pink",
  },
  {
    id: 5,
    title: "Weekly Report Gen",
    description: "Compile and email weekly performance reports to the management team.",
    status: "active",
    runs: "156",
    successRate: "100%",
    icon: "solar:document-text-bold-duotone",
    color: "emerald",
  },
  {
    id: 6,
    title: "Customer Support Tagging",
    description: "Analyze incoming tickets and auto-tag them based on keywords.",
    status: "active",
    runs: "8.9K",
    successRate: "96.5%",
    icon: "solar:tag-bold-duotone",
    color: "cyan",
  },
];

export default function ActiveAutomationsList() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [editingAutomation, setEditingAutomation] = useState(null);
  const [viewingLogsAutomation, setViewingLogsAutomation] = useState(null);

  const handleToggle = (id) => {
    setAutomations(automations.map(auto => {
      if (auto.id === id) {
        return { ...auto, status: auto.status === 'active' ? 'paused' : 'active' };
      }
      return auto;
    }));
  };

  return (
    <>
      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-black">Active Workflows</h3>
            <p className="text-sm text-gray-500">Manage your automated tasks</p>
          </div>
          <button className="text-sm font-medium text-black hover:text-blue-700 flex items-center gap-1">
            View All
            <Icon icon="solar:arrow-right-linear" width="16" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {automations.map((item) => (
            <div 
              key={item.id} 
              className="group border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${item.color}-50 text-${item.color}-600 transition-colors duration-300`}>
                  <Icon icon={item.icon} width="22" />
                </div>
                <button 
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${item.status === 'active' ? 'bg-[#007ce1]' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <h4 className="font-bold text-black mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{item.description}</p>

              <div className="flex items-center gap-4 py-3 border-t border-gray-50">
                <div>
                  <p className="text-xs text-[#fff]">Total Runs</p>
                  <p className="text-sm font-semibold text-black">{item.runs}</p>
                </div>
                <div className="h-8 w-px bg-gray-100"></div>
                <div>
                  <p className="text-xs text-[#fff]">Success Rate</p>
                  <p className="text-sm font-semibold text-black">{item.successRate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => setEditingAutomation(item)}
                  className="flex-1 py-2 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover:text-black"
                >
                  Edit
                </button>
                <button 
                  onClick={() => setViewingLogsAutomation(item)}
                  className="flex-1 py-2 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover:text-black"
                >
                  Logs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditAutomationModal 
        isOpen={!!editingAutomation}
        onClose={() => setEditingAutomation(null)}
        automation={editingAutomation}
      />

      <AutomationLogsModal
        isOpen={!!viewingLogsAutomation}
        onClose={() => setViewingLogsAutomation(null)}
        automation={viewingLogsAutomation}
      />
    </>
  );
}
