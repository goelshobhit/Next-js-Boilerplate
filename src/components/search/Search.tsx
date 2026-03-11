'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { SearchModal } from '@/components/search/SearchModal';

export function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'f')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="relative w-full group focus:outline-none cursor-pointer hidden sm:block"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#fff] group-hover:text-blue-500 transition-colors">
          <Icon icon="mdi:magnify" width={20} />
        </div>
        <div className="w-full py-2.5 pl-10 pr-4 bg-gray-50 text-left text-sm text-[#fff] rounded-lg border border-transparent group-hover:bg-white group-hover:border-blue-100 group-hover:ring-2 group-hover:ring-blue-50 transition-all">
          Search...
        </div>
        <div className="absolute inset-y-0 right-0 hidden md:flex items-center pr-3 pointer-events-none">
          <span className="text-xs text-[#fff] border border-gray-200 rounded px-1.5 py-0.5 group-hover:border-blue-100 group-hover:text-blue-400 transition-colors">
            ⌘ + F
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Search"
      >
        <Icon icon="mdi:magnify" width={24} />
      </button>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
