'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const actions = [
  {
    name: 'New Campaign',
    icon: 'mdi:rocket-launch-outline',
    description: 'Launch a new marketing campaign',
  },
  {
    name: 'Add Task',
    icon: 'mdi:checkbox-marked-circle-outline',
    description: 'Create a new task for your team',
  },
  {
    name: 'New Project',
    icon: 'mdi:folder-plus-outline',
    description: 'Start a new project folder',
  },
  {
    name: 'Invite Member',
    icon: 'mdi:account-plus-outline',
    description: 'Invite a new team member',
  },
];

export function QuickActionDropdown() {
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
        aria-label="Quick actions"
      >
        <Icon icon="mdi:plus-circle-outline" width={22} />
      </button>

      <div
        className={`fixed left-4 right-4 top-[80px] w-auto mt-0 sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-72 sm:left-auto bg-white rounded-xl border border-gray-200 transform transition-all duration-200 origin-top-right z-50 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
        }`}
      >
        <div className="p-4 border-b border-gray-50">
          <h3 className="font-semibold text-black">Quick Actions</h3>
        </div>

        <div className="p-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              className="w-full flex items-start gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg group transition-colors text-left cursor-pointer"
            >
              <div className="mt-1 p-1.5 rounded-lg bg-blue-50 text-black group-hover:bg-blue-100 transition-colors">
                <Icon icon={action.icon} width={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-black group-hover:text-black transition-colors">
                  {action.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
