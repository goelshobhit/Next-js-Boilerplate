'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const logos = [
  { name: 'Acme Corp', icon: 'mdi:cube-outline' },
  { name: 'Quantum', icon: 'mdi:atom' },
  { name: 'Echo', icon: 'mdi:waveform' },
  { name: 'Nebula', icon: 'mdi:creation' },
  { name: 'Vertex', icon: 'mdi:triangle-outline' },
  { name: 'Horizon', icon: 'mdi:weather-sunset' },
];

export function LogoCloudSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section className="py-12 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-500 mb-8">{t('logo_trusted')}</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map(logo => (
            <div key={logo.name} className="flex items-center gap-2 group cursor-default">
              <Icon
                icon={logo.icon}
                width={32}
                className="text-[#fff] group-hover:text-black transition-colors"
              />
              <span className="text-xl font-bold text-[#fff] group-hover:text-black transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
