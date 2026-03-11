import { Icon } from "@iconify/react";

const executions = [
  {
    id: "EX-001",
    automation: "Welcome Email Sequence",
    trigger: "New Subscriber",
    status: "success",
    duration: "1.2s",
    time: "2 mins ago",
  },
  {
    id: "EX-002",
    automation: "Invoice Reminders",
    trigger: "Daily Schedule",
    status: "success",
    duration: "4.5s",
    time: "15 mins ago",
  },
  {
    id: "EX-003",
    automation: "Lead Scoring",
    trigger: "User Activity",
    status: "failed",
    duration: "0.8s",
    time: "1 hour ago",
  },
  {
    id: "EX-004",
    automation: "Social Media Auto-Post",
    trigger: "Scheduled Post",
    status: "success",
    duration: "2.1s",
    time: "2 hours ago",
  },
  {
    id: "EX-005",
    automation: "Customer Support Tagging",
    trigger: "New Ticket",
    status: "success",
    duration: "1.5s",
    time: "3 hours ago",
  },
  {
    id: "EX-006",
    automation: "Weekly Report Gen",
    trigger: "Schedule",
    status: "success",
    duration: "3.2s",
    time: "4 hours ago",
  },
  {
    id: "EX-007",
    automation: "Lead Scoring",
    trigger: "User Activity",
    status: "failed",
    duration: "0.9s",
    time: "5 hours ago",
  },
  {
    id: "EX-008",
    automation: "Invoice Reminders",
    trigger: "Daily Schedule",
    status: "success",
    duration: "4.1s",
    time: "6 hours ago",
  },
];

export default function RecentExecutionsTable() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-lg font-bold text-black">Recent Executions</h3>
          <p className="text-sm text-gray-500">Real-time automation activity log</p>
        </div>
        <button className="p-2 text-[#fff] hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="20" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 max-h-[350px] overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="bg-gray-50/50 border-b border-gray-100 shadow-sm">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Automation</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trigger</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 ">
            {executions.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 text-gray-500 rounded-lg">
                      <Icon icon="solar:bolt-circle-bold-duotone" width="18" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{item.automation}</p>
                      <p className="text-xs text-gray-500 font-mono">{item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{item.trigger}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.status === 'success' 
                      ? 'bg-green-50 text-green-700 border-green-100' 
                      : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    {item.status === 'success' ? 'Success' : 'Failed'}
                  </span>
                </td>
                <td className="p-4 text-right text-sm text-gray-500">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
