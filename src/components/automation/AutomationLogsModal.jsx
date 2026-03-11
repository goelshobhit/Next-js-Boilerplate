import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function AutomationLogsModal({ isOpen, onClose, automation }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !automation) return null;

  // Mock logs data
  const logs = [
    { id: "LOG-001", status: "success", time: "2 mins ago", duration: "1.2s", trigger: "New Subscriber" },
    { id: "LOG-002", status: "success", time: "15 mins ago", duration: "0.8s", trigger: "New Subscriber" },
    { id: "LOG-003", status: "failed", time: "1 hour ago", duration: "5.0s", trigger: "API Timeout" },
    { id: "LOG-004", status: "success", time: "3 hours ago", duration: "1.1s", trigger: "New Subscriber" },
    { id: "LOG-005", status: "success", time: "5 hours ago", duration: "0.9s", trigger: "New Subscriber" },
    { id: "LOG-006", status: "success", time: "1 day ago", duration: "1.3s", trigger: "Manual Trigger" },
  ];

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? "visible" : "invisible delay-300"
      }`}
    >
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div 
        className={`relative bg-white w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100 delay-100" : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${automation.color}-50 text-${automation.color}-600`}>
              <Icon icon="solar:history-bold-duotone" width="22" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Execution Logs</h2>
              <p className="text-sm text-gray-500">History for "{automation.title}"</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50/50 border-b border-gray-100 shrink-0">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Runs</p>
            <p className="text-2xl font-bold text-black">{automation.runs}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">{automation.successRate}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Avg Duration</p>
            <p className="text-2xl font-bold text-black">1.2s</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider pl-6">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Run ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trigger</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-6">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group cursor-default">
                  <td className="p-4 pl-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      log.status === 'success' 
                        ? 'bg-green-50 text-green-700 border-green-100' 
                        : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {log.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-mono text-gray-500">{log.id}</td>
                  <td className="p-4 text-sm text-black font-medium">{log.trigger}</td>
                  <td className="p-4 text-sm text-gray-500">{log.duration}</td>
                  <td className="p-4 pr-6 text-right text-sm text-gray-500">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-center shrink-0">
          <button className="text-sm font-medium text-black hover:text-blue-700 transition-colors">
            View Full History
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
