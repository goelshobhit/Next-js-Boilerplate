import { Icon } from "@iconify/react";
import { useState } from "react";

export default function AuditLogModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const logs = [
    { id: 1, action: "User Login", user: "John Doe", ip: "192.168.1.1", time: "2 mins ago", status: "success", icon: "solar:login-3-bold-duotone" },
    { id: 2, action: "Password Changed", user: "John Doe", ip: "192.168.1.1", time: "1 hour ago", status: "success", icon: "solar:lock-password-bold-duotone" },
    { id: 3, action: "Failed Login", user: "Unknown", ip: "45.32.11.21", time: "3 hours ago", status: "danger", icon: "solar:shield-warning-bold-duotone" },
    { id: 4, action: "API Key Created", user: "Jane Smith", ip: "10.0.0.5", time: "5 hours ago", status: "warning", icon: "solar:key-bold-duotone" },
    { id: 5, action: "2FA Enabled", user: "John Doe", ip: "192.168.1.1", time: "1 day ago", status: "success", icon: "solar:shield-check-bold-duotone" },
    { id: 6, action: "Device Removed", user: "John Doe", ip: "192.168.1.1", time: "2 days ago", status: "info", icon: "solar:trash-bin-trash-bold-duotone" },
    { id: 7, action: "Settings Updated", user: "Jane Smith", ip: "10.0.0.5", time: "3 days ago", status: "success", icon: "solar:settings-bold-duotone" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'danger': return 'text-red-600 bg-red-50 border-red-100';
      case 'info': return 'text-black bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative transform transition-all duration-300 flex flex-col max-h-[85vh] ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Icon icon="solar:history-bold-duotone" width="24" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-black">Audit Log</h3>
                <p className="text-sm text-gray-500 mt-0.5">Track all security events and user activities.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#fff] hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
            <div className="relative">
                <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                <input 
                    type="text" 
                    placeholder="Search logs by user, action, or IP..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Body */}
        <div className="p-0 overflow-y-auto overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    <tr>
                        <th className="px-8 py-4 border-b border-gray-100">Event</th>
                        <th className="px-6 py-4 border-b border-gray-100">User</th>
                        <th className="px-6 py-4 border-b border-gray-100">IP Address</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right">Time</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-8 py-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getStatusColor(log.status).split(' ')[2]} ${getStatusColor(log.status).split(' ')[1]} ${getStatusColor(log.status).split(' ')[0]}`}>
                                        <Icon icon={log.icon} width="20" />
                                    </div>
                                    <span className="font-bold text-black">{log.action}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {log.user.charAt(0)}
                                    </div>
                                    <span className="text-sm text-gray-600">{log.user}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{log.ip}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-sm text-gray-500">{log.time}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500">Showing recent 7 events</p>
            <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                Export CSV
                <Icon icon="solar:export-bold" width="16" />
            </button>
        </div>
      </div>
    </div>
  );
}
