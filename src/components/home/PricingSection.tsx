'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small teams and startups.',
    features: ['Up to 5 team members', 'Basic Analytics', '1,000 active contacts', 'Email Support'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'For growing teams that need more power.',
    features: [
      'Up to 20 team members',
      'Advanced Analytics',
      'Unlimited contacts',
      'Priority Support',
      'Automation Workflows',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom solutions for large organizations.',
    features: [
      'Unlimited team members',
      'Custom Reporting',
      'Dedicated Account Manager',
      'SSO & Advanced Security',
      'SLA Support',
    ],
    popular: false,
  },
];

export function PricingSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t('pricing_heading')}</h2>
          <p className="text-lg text-gray-600">{t('pricing_subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border ${
                plan.popular
                  ? 'bg-[#007ce1] text-white border-[#007ce1] shadow-2xl scale-105 z-10'
                  : 'bg-white text-black border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#007ce1] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20">
                  {t('pricing_most_popular')}
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-lg font-bold mb-2 ${plan.popular ? 'text-gray-200' : 'text-black'}`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className={`text-sm ${plan.popular ? 'text-[#fff]' : 'text-gray-500'}`}>
                      {t('pricing_per_month')}
                    </span>
                  )}
                </div>
                <p className={`mt-4 text-sm ${plan.popular ? 'text-[#fff]' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Icon
                      icon="solar:check-circle-bold"
                      className={plan.popular ? 'text-blue-400' : 'text-black'}
                      width={20}
                    />
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-[#007ce1] text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {t('pricing_choose', { name: plan.name })}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
