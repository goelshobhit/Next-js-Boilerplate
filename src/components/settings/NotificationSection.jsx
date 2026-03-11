import { useState } from "react";
import { Icon } from "@iconify/react";

const notificationGroups = [
  {
    title: "Email Notifications",
    description: "Manage what emails you receive from us.",
    items: [
      { id: "news", label: "Weekly Newsletter", description: "Get the latest updates and trends.", default: true },
      { id: "product", label: "Product Updates", description: "New features and improvements.", default: true },
      { id: "tips", label: "Marketing Tips", description: "Best practices for your fleet.", default: false },
    ]
  },
  {
    title: "Push Notifications",
    description: "Real-time alerts on your device.",
    items: [
      { id: "comments", label: "New Comments", description: "When someone comments on your tasks.", default: true },
      { id: "mentions", label: "Mentions", description: "When someone mentions you.", default: true },
      { id: "reminders", label: "Task Reminders", description: "Deadlines and scheduled tasks.", default: true },
    ]
  }
];

export default function NotificationSection() {
  const [toggles, setToggles] = useState(
    notificationGroups.reduce((acc, group) => {
      group.items.forEach(item => acc[item.id] = item.default);
      return acc;
    }, {})
  );

  const handleToggle = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {notificationGroups.map((group, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black">{group.title}</h3>
            <p className="text-sm text-gray-500">{group.description}</p>
          </div>
          <div className="space-y-6">
            {group.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <button 
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${toggles[item.id] ? 'bg-[#007ce1]' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles[item.id] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="flex justify-end">
        <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#007ce1] hover:bg-blue-700 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            <Icon icon="solar:disk-bold-duotone" />
            Save Preferences
        </button>
      </div>
    </div>
  );
}
