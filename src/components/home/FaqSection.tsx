'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const faqs = [
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, we offer a 14-day free trial on all paid plans. No credit card required to start.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time from your account settings.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer email support for all plans, and priority support for Pro and Enterprise plans.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, we take security seriously. We use bank-level encryption and follow industry best practices to keep your data safe.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">{t('faq_heading')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('faq_subheading')}</p>
            <button
              type="button"
              className="text-black font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t('faq_contact_support')}
              <Icon icon="solar:arrow-right-linear" />
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  openIndex === index ? 'border-blue-200 shadow-md' : 'border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-black">{faq.question}</span>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    className={`text-[#fff] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-black' : ''
                    }`}
                    width={24}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
