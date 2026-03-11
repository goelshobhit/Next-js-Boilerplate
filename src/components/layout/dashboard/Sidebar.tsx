'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Link, usePathname } from '@/libs/I18nNavigation';

const menuGroups = [
  {
    title: 'GENERAL',
    items: [
      { name: 'Dashboard', icon: 'mdi:view-dashboard-outline', href: '/dashboard/' },
      { name: 'Payment', icon: 'mdi:credit-card-outline', href: '/dashboard/payment' },
      { name: 'Customers', icon: 'mdi:account-group-outline', href: '/dashboard/customers' },
      { name: 'Message', icon: 'mdi:message-outline', href: '/dashboard/messages', badge: 8 },
    ],
  },
  {
    title: 'TOOLS',
    items: [
      { name: 'Product', icon: 'mdi:package-variant-closed', href: '/dashboard/products' },
      { name: 'Invoice', icon: 'mdi:file-document-outline', href: '/dashboard/invoices' },
      { name: 'Analytics', icon: 'mdi:chart-bar', href: '/dashboard/analytics' },
      { name: 'Automation', icon: 'mdi:robot-outline', href: '/dashboard/automation', tag: 'BETA' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { name: 'Settings', icon: 'mdi:cog-outline', href: '/dashboard/settings' },
      { name: 'Security', icon: 'mdi:shield-outline', href: '/dashboard/security' },
      { name: 'Help', icon: 'mdi:help-circle-outline', href: '/dashboard/help' },
    ],
  },
];

export function Sidebar(props: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('Marketing');

  return (
    <>
      {props.isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => props.setIsMobileOpen(false)}
          role="presentation"
        />
      )}

      <aside
        className={`bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300
          ${props.isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          ${props.isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64
        `}
      >
        <div
          className={`p-6 flex items-center ${props.isCollapsed ? 'lg:justify-center lg:px-2' : 'justify-between'} gap-2 relative transition-all duration-300`}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="TTMSConnect"
              width={120}
              height={120}
              className="shrink-0 rounded-lg object-contain"
            />
          </div>

          <button
            type="button"
            onClick={props.toggleSidebar}
            className={`hidden lg:flex cursor-pointer text-gray-600 p-1 rounded bg-gray-100 transition-all duration-300 z-50 ${
              !props.isCollapsed ? 'ml-auto' : 'absolute -right-[0.8em] top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center'
            }`}
            aria-label="Toggle sidebar"
          >
            <Icon
              icon="mdi:chevron-left"
              width={props.isCollapsed ? 20 : 24}
              className={`transition-transform duration-300 ${props.isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>

          <button
            type="button"
            onClick={() => props.setIsMobileOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded"
            aria-label="Close menu"
          >
            <Icon icon="mdi:close" width={24} />
          </button>
        </div>

        <div
          className={`flex-1 px-4 space-y-8 mt-2 overflow-x-hidden ${props.isCollapsed ? 'lg:overflow-hidden' : 'overflow-y-auto'}`}
        >
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3
                className={`text-xs font-semibold text-gray-500 mb-4 px-2 uppercase tracking-wider transition-opacity duration-300 ${
                  props.isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'
                }`}
              >
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={() => props.setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative ${
                          isActive ? 'text-black bg-blue-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'
                        } ${props.isCollapsed ? 'lg:justify-center' : ''}`}
                      >
                        <Icon
                          icon={item.icon}
                          width={20}
                          className={`shrink-0 ${isActive ? 'text-black' : 'text-gray-500'}`}
                        />

                        <div className={`${props.isCollapsed ? 'lg:hidden' : 'block'} flex-1 flex items-center`}>
                          <span className="whitespace-nowrap">{item.name}</span>
                          {'badge' in item && item.badge !== undefined && (
                            <span className="ml-auto bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                          {'tag' in item && item.tag && (
                            <span className="ml-auto bg-blue-50 text-black text-[10px] py-0.5 px-1.5 rounded-md font-bold uppercase">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        {props.isCollapsed && (
                          <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#007ce1] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {item.name}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="relative mb-4">
            <button
              type="button"
              onClick={() => setIsTeamOpen(!isTeamOpen)}
              className={`w-full bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 flex items-center gap-3 border border-transparent hover:border-gray-200 ${
                props.isCollapsed ? 'lg:p-2 lg:justify-center' : 'p-2'
              }`}
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black shadow-sm shrink-0">
                <Icon icon="mdi:diamond-stone" width={16} />
              </div>
              <div className={`${props.isCollapsed ? 'lg:hidden' : 'block'} flex-1 text-left`}>
                <p className="text-sm font-semibold text-black leading-tight">Team</p>
                <p className="text-[10px] text-gray-500 font-medium">{selectedTeam}</p>
              </div>
              <Icon
                icon="mdi:chevron-down"
                width={16}
                className={`${props.isCollapsed ? 'lg:hidden' : 'block'} ml-auto text-gray-500 transition-transform duration-200 ${
                  isTeamOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isTeamOpen && (
              <div
                className={`absolute bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden py-1 z-50 ${
                  props.isCollapsed
                    ? 'lg:left-full lg:bottom-0 lg:ml-4 lg:w-48 bottom-full left-0 w-full mb-2'
                    : 'bottom-full left-0 w-full mb-2'
                }`}
              >
                {['Marketing', 'Development', 'Design'].map(team => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsTeamOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs font-medium hover:bg-gray-50 flex items-center justify-between ${
                      selectedTeam === team ? 'text-black bg-blue-50' : 'text-gray-600'
                    }`}
                  >
                    {team}
                    {selectedTeam === team && <Icon icon="mdi:check" width={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={`${props.isCollapsed ? 'lg:hidden' : 'block'}`}>
            <Link
              href="/dashboard/upgrade"
              className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Upgrade Plan
            </Link>

            <p className="text-[10px] text-gray-500 mt-4 text-center whitespace-nowrap">
              © {new Date().getFullYear()} Total Transport Management Inc.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
