'use client';

import { Icon } from '@iconify/react';
import { NotificationDropdown } from '@/components/layout/dashboard/NotificationDropdown';
import { ProfileDropdown } from '@/components/layout/dashboard/ProfileDropdown';
import { GiftModal } from '@/components/layout/dashboard/GiftModal';
import { QuickActionDropdown } from '@/components/layout/dashboard/QuickActionDropdown';

export function Header(props: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-10 gap-2 md:gap-4">
      <button
        type="button"
        onClick={props.onMenuClick}
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Icon icon="mdi:menu" width={24} />
      </button>



      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <GiftModal />
        <NotificationDropdown />
        <QuickActionDropdown />
        <div className="h-8 w-px bg-gray-200 mx-2" />
        <ProfileDropdown />
      </div>
    </header>
  );
}
