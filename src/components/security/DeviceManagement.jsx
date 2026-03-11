import { Icon } from "@iconify/react";

const devices = [
  { id: 1, name: "MacBook Pro M2", type: "Laptop", os: "macOS Sonoma", location: "San Francisco, US", lastActive: "Active now", isCurrent: true, icon: "solar:laptop-minimalistic-bold-duotone" },
  { id: 2, name: "iPhone 15 Pro", type: "Mobile", os: "iOS 17.2", location: "San Francisco, US", lastActive: "2 hours ago", isCurrent: false, icon: "solar:smartphone-bold-duotone" },
  { id: 3, name: "Chrome on Windows", type: "Desktop", os: "Windows 11", location: "Austin, US", lastActive: "3 days ago", isCurrent: false, icon: "solar:monitor-bold-duotone" },
  { id: 4, name: "iPad Air", type: "Tablet", os: "iPadOS 17", location: "San Jose, US", lastActive: "1 week ago", isCurrent: false, icon: "solar:tablet-bold-duotone" },
];

export default function DeviceManagement() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-black">Trusted Devices</h3>
          <p className="text-sm text-gray-500">Manage devices that are logged into your account.</p>
        </div>
        <button className="bg-[#007ce1] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            <Icon icon="solar:logout-3-bold-duotone" />
            Sign Out All
        </button>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group bg-gray-50/50 hover:bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm group-hover:text-black group-hover:border-blue-100 transition-colors">
                <Icon icon={device.icon} width="24" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-black">{device.name}</h4>
                    {device.isCurrent && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wide">
                            Current
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                    {device.location} • {device.os} • <span className={device.isCurrent ? "text-green-600 font-medium" : ""}>{device.lastActive}</span>
                </p>
              </div>
            </div>
            
            <button 
                className="p-2 text-[#fff] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Remove Device"
            >
                <Icon icon="solar:trash-bin-trash-bold" width="20" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
