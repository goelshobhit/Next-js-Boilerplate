'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/dashboard/Sidebar';
import { Header } from '@/components/layout/dashboard/Header';

export function DashboardLayoutClient(props: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} ml-0 w-full`}
      >
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8 space-y-8 max-w-full overflow-x-hidden">{props.children}</main>
      </div>
    </div>
  );
}
