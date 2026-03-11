'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const notifications = [
  {
    id: 1,
    title: 'New Project Assigned',
    message: "You have been assigned to 'Marketing Campaign 2024'",
    time: '2 min ago',
    type: 'project' as const,
    isRead: false,
  },
  {
    id: 2,
    title: 'Meeting Reminder',
    message: 'Team Standup in 15 minutes',
    time: '15 min ago',
    type: 'meeting' as const,
    isRead: false,
  },
  {
    id: 3,
    title: 'Task Completed',
    message: "Sarah completed 'Design Homepage' task",
    time: '1 hour ago',
    type: 'task' as const,
    isRead: true,
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 relative transition-colors cursor-pointer ${isOpen ? 'bg-gray-50 text-gray-700' : ''}`}
        aria-label="Notifications"
      >
        <Icon icon="mdi:bell-outline" width={22} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>

      <div
        className={`fixed left-4 right-4 top-[80px] w-auto mt-0 sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:left-auto bg-white rounded-xl border border-gray-200 transform transition-all duration-200 origin-top-right z-50 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
        }`}
      >
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-black">Notifications</h3>
          <button type="button" className="text-xs text-black hover:text-blue-700 font-medium">
            Mark all as read
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition-colors ${
                !notification.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div
                className={`mt-1 p-1.5 rounded-full shrink-0 ${
                  notification.type === 'project'
                    ? 'bg-purple-100 text-purple-600'
                    : notification.type === 'meeting'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                }`}
              >
                <Icon
                  icon={
                    notification.type === 'project'
                      ? 'mdi:folder-outline'
                      : notification.type === 'meeting'
                        ? 'mdi:clock-outline'
                        : 'mdi:check-circle-outline'
                  }
                  width={16}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">{notification.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notification.message}</p>
                <p className="text-[10px] text-[#fff] mt-1.5">{notification.time}</p>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              )}
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-50 bg-gray-50/50 rounded-b-xl text-center">
          <button type="button" className="text-xs font-medium text-gray-600 hover:text-black transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
