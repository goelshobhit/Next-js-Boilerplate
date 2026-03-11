'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const recentSearches = [
  { text: 'Marketing Strategy 2024', type: 'file' as const },
  { text: 'Q3 Financial Report', type: 'file' as const },
  { text: 'New User Onboarding', type: 'project' as const },
  { text: 'Design System Updates', type: 'task' as const },
];

export function SearchModal(props: { isOpen: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
    setIsVisible(false);
    const timer = setTimeout(() => setShouldRender(false), 300);
    return () => clearTimeout(timer);
  }, [props.isOpen]);

  useEffect(() => {
    if (props.isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose();
    };

    if (props.isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props.isOpen, props.onClose]);

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 transition-all duration-300 ${isVisible ? 'visible' : 'invisible'}`}
    >
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={props.onClose}
        role="presentation"
      />

      <div
        className={`relative w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
        }`}
      >
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <Icon icon="mdi:magnify" width={24} className="text-[#fff] mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, files, or tasks..."
            className="flex-1 text-lg text-black placeholder-[#fff] border-none focus:ring-0 focus:outline-none bg-transparent h-12"
          />
          <button
            type="button"
            onClick={props.onClose}
            className="p-1 text-[#fff] hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xs font-medium border border-gray-200 rounded px-1.5 py-0.5">ESC</span>
          </button>
        </div>

        <div className="p-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent Searches
          </div>
          <ul className="mt-1">
            {recentSearches.map((item, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-lg group transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 mr-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Icon
                      icon={
                        item.type === 'file'
                          ? 'mdi:file-document-outline'
                          : item.type === 'project'
                            ? 'mdi:folder-outline'
                            : 'mdi:checkbox-marked-circle-outline'
                      }
                      width={18}
                    />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-black">{item.text}</span>
                  <Icon
                    icon="mdi:arrow-top-left"
                    width={16}
                    className="ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:arrow-up-down" width={14} /> to navigate
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:keyboard-return" width={14} /> to select
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
