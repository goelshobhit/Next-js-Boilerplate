import { Icon } from "@iconify/react";

const sessions = [
  { device: "MacBook Pro", location: "San Francisco, US", active: true, time: "Active now", icon: "solar:laptop-minimalistic-bold-duotone" },
  { device: "iPhone 14 Pro", location: "San Francisco, US", active: false, time: "2 hours ago", icon: "solar:smartphone-bold-duotone" },
  { device: "Windows PC", location: "Austin, US", active: false, time: "3 days ago", icon: "solar:monitor-bold-duotone" },
];

export default function SecuritySection() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <h3 className="text-lg font-bold text-black mb-6">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-bold text-black mb-2">Password Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center gap-2 text-green-600">
                        <Icon icon="solar:check-circle-bold" width="16" />
                        Minimum 8 characters long
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                        <Icon icon="solar:check-circle-bold" width="16" />
                        At least one uppercase character
                    </li>
                    <li className="flex items-center gap-2">
                        <Icon icon="solar:check-circle-bold" className="text-gray-300" width="16" />
                        At least one number
                    </li>
                    <li className="flex items-center gap-2">
                        <Icon icon="solar:check-circle-bold" className="text-gray-300" width="16" />
                        At least one special character
                    </li>
                </ul>
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#007ce1] hover:bg-blue-700 rounded-xl transition-all hover:scale-105 active:scale-95">
                Update Password
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-lg font-bold text-black">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
            </div>
            <button className="px-5 py-2.5 text-sm font-bold text-black bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                Enable 2FA
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <h3 className="text-lg font-bold text-black mb-6">Active Sessions</h3>
        <div className="space-y-4">
            {sessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-black transition-colors">
                            <Icon icon={session.icon} width="24" />
                        </div>
                        <div>
                            <p className="font-bold text-black">{session.device}</p>
                            <p className="text-xs text-gray-500">{session.location} • {session.time}</p>
                        </div>
                    </div>
                    {session.active ? (
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                            Current Session
                        </span>
                    ) : (
                        <button className="text-[#fff] hover:text-red-500 transition-colors">
                            <Icon icon="solar:trash-bin-trash-bold" width="20" />
                        </button>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
