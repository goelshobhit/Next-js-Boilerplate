'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const features = [
  {
    title: 'Real-time Analytics',
    description: 'Track your campaign performance in real-time with our advanced dashboard.',
    icon: 'solar:chart-2-bold-duotone',
    color: 'bg-blue-100 text-black',
  },
  {
    title: 'Marketing Automation',
    description: 'Automate repetitive tasks and workflows to save time and reduce errors.',
    icon: 'solar:settings-bold-duotone',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'Audience Segmentation',
    description: 'Target the right people with precise segmentation tools and filters.',
    icon: 'solar:users-group-rounded-bold-duotone',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Revenue Tracking',
    description: 'Monitor your ROI and revenue growth across all channels seamlessly.',
    icon: 'solar:wallet-money-bold-duotone',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    title: 'Custom Reports',
    description: 'Generate beautiful, branded reports to share with your team or clients.',
    icon: 'solar:document-text-bold-duotone',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together with your team in real-time with built-in commenting and roles.',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    color: 'bg-pink-100 text-pink-600',
  },
];

export function FeaturesSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t('features_heading')}</h2>
          <p className="text-lg text-gray-600">{t('features_subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon icon={feature.icon} width={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-black transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
