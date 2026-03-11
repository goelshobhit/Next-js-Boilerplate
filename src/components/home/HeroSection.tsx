'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

export function HeroSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-black text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          {t('hero_badge')}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tight mb-6 leading-[1.1] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {t('hero_headline')}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007ce1] to-indigo-600">
            {t('hero_headline_highlight')}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          {t('hero_subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link
            href="/sign-up/"
            className="w-full sm:w-auto px-8 py-4 bg-[#007ce1] text-white rounded-2xl font-bold hover:bg-[#007ce1] transition-all hover:shadow-xl hover:shadow-[#007ce1]/20 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {t('hero_cta_trial')}
            <Icon icon="solar:arrow-right-linear" width={20} />
          </Link>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:border-gray-300"
          >
            <Icon icon="solar:play-circle-linear" width={24} />
            {t('hero_cta_demo')}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <div className="flex items-center text-yellow-400">
              <Icon icon="solar:star-bold" />
              <Icon icon="solar:star-bold" />
              <Icon icon="solar:star-bold" />
              <Icon icon="solar:star-bold" />
              <Icon icon="solar:star-bold" />
            </div>
            <span>{t('hero_social_proof')}</span>
          </div>
        </div>

        <div className="mt-20 relative mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="rounded-3xl border border-gray-200 bg-gray-50/50 p-2 sm:p-4 backdrop-blur-sm shadow-2xl shadow-blue-900/10">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white relative aspect-[16/9]">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#fff] text-sm">
                Dashboard preview
              </div>
              <div className="absolute top-8 left-8 w-64 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl shadow-blue-900/20 border border-gray-100 hidden lg:block animate-in slide-in-from-left duration-1000 delay-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-black flex items-center justify-center">
                    <Icon icon="solar:chart-2-bold" width={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                    <p className="text-lg font-bold text-black">$48,294</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-[#007ce1] rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-8 right-8 w-64 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl shadow-blue-900/20 border border-gray-100 hidden lg:block animate-in slide-in-from-right duration-1000 delay-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                    <Icon icon="solar:users-group-rounded-bold" width={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="text-lg font-bold text-black">+2,409</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <Icon icon="solar:trending-up-linear" />
                  <span>12.5% increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
