'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

const features = [
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Get deeper insights with our new predictive analytics tools.',
    icon: 'mdi:chart-box-outline',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Team Collaboration Suite',
    description: 'Real-time commenting and task assignment for your whole team.',
    icon: 'mdi:account-group-outline',
    color: 'bg-blue-100 text-black',
  },
  {
    title: 'Automated Reporting',
    description: 'Schedule weekly reports delivered straight to your inbox.',
    icon: 'mdi:file-document-outline',
    color: 'bg-green-100 text-green-600',
  },
];

export function GiftModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
    setIsVisible(false);
    return undefined;
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 relative transition-colors cursor-pointer"
        aria-label="What's new"
      >
        <Icon icon="mdi:gift-outline" width={22} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsOpen(false)}
              role="presentation"
            />

            <div
              className={`relative w-full max-w-md bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ease-out transform ${
                isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <Icon icon="mdi:close" width={24} />
                </button>

                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon icon="mdi:party-popper" width={24} />
                  </div>
                  <h2 className="text-xl font-bold">What&apos;s New in TTMSConnect</h2>
                </div>
                <p className="text-indigo-100 text-sm relative z-10">
                  Check out the latest features we&apos;ve added to boost your productivity.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-default"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon icon={feature.icon} width={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{feature.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 bg-[#007ce1] hover:bg-[#007ce1] text-white font-medium rounded-xl transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Explore Features</span>
                  <Icon icon="mdi:arrow-right" width={18} />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
