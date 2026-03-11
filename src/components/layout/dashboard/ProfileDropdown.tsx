'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@/libs/I18nNavigation';

export function ProfileDropdown() {
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

  const menuItems = [
    { name: 'My Profile', icon: 'mdi:account-outline', href: '/dashboard/settings?tab=profile' },
    { name: 'Account Settings', icon: 'mdi:cog-outline', href: '/dashboard/settings?tab=security' },
    { name: 'Billing & Plan', icon: 'mdi:credit-card-outline', href: '/dashboard/settings?tab=billing' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-2 group focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-white transition-transform duration-200 group-hover:scale-105"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-black leading-none group-hover:text-black transition-colors">
            User
          </p>
          <p className="text-xs text-gray-500 mt-1">Account</p>
        </div>
        <Icon
          icon="mdi:chevron-down"
          width={16}
          className={`text-[#fff] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 transform transition-all duration-200 origin-top-right z-50 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
        }`}
      >
        <div className="p-3 border-b border-gray-50">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Signed in as</p>
          <p className="text-sm font-semibold text-black truncate">guest@example.com</p>
        </div>

        <div className="p-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Icon icon={item.icon} width={18} className="text-[#fff]" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-2 border-t border-gray-50">
          <Link
            href="/sign-out"
            className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Icon icon="mdi:logout" width={18} />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
