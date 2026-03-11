'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    number: '01',
    title: 'Connect your data',
    description:
      'Seamlessly integrate with your favorite marketing tools and platforms in one click.',
    icon: 'solar:link-circle-bold-duotone',
  },
  {
    number: '02',
    title: 'Analyze insights',
    description: 'Get AI-powered insights and recommendations to improve your campaign performance.',
    icon: 'solar:magic-stick-3-bold-duotone',
  },
  {
    number: '03',
    title: 'Automate & Scale',
    description: 'Set up automation rules and watch your growth skyrocket while you sleep.',
    icon: 'solar:rocket-2-bold-duotone',
  },
];

export function ProcessSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section id="process" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
              <Icon icon="solar:bolt-bold" width={16} />
              {t('process_badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">{t('process_heading')}</h2>
            <p className="text-lg text-gray-600 mb-12">{t('process_subheading')}</p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-[#fff] group-hover:border-blue-500 group-hover:text-black transition-colors z-10 relative shadow-sm">
                      {step.number}
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="absolute top-12 left-6 w-px h-24 bg-gray-200 -translate-x-1/2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2 flex items-center gap-2">
                      {step.title}
                      <Icon
                        icon={step.icon}
                        className="text-black opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#007ce1] to-indigo-600 rounded-[2.5rem] rotate-3 opacity-10" />
            <div className="relative rounded-[2rem] shadow-2xl border-4 border-white aspect-video bg-gray-100 flex items-center justify-center text-[#fff]">
              Workflow preview
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-bounce-slow hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Icon icon="solar:check-circle-bold" width={24} />
                </div>
                <div>
                  <p className="font-bold text-black">Automation Active</p>
                  <p className="text-sm text-gray-500">Campaign running smoothly</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
