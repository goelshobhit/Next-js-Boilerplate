'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

export function CtaSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-[#007ce1] overflow-hidden px-8 py-20 md:px-20 md:py-24 text-center">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007ce1]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t('cta_heading')}
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">{t('cta_subheading')}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up/"
                className="w-full sm:w-auto px-8 py-4 bg-[#007ce1] text-white rounded-2xl font-bold hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-[#007ce1]/30 flex items-center justify-center gap-2"
              >
                {t('cta_get_started')}
                <Icon icon="solar:rocket-bold" />
              </Link>
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-sm border border-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                {t('cta_contact_sales')}
              </button>
            </div>

            <p className="mt-8 text-sm text-[#fff]">{t('cta_disclaimer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
