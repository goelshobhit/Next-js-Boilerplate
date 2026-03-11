'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

const navLinks = [
  { nameKey: 'nav_features' as const, href: '#features' },
  { nameKey: 'nav_how_it_works' as const, href: '#process' },
  { nameKey: 'nav_pricing' as const, href: '#pricing' },
  { nameKey: 'nav_faq' as const, href: '#faq' },
];

export function Navbar(props: { isScrolled: boolean; isMobileMenuOpen: boolean; setIsMobileMenuOpen: (v: boolean) => void }) {
  const t = useTranslations('TTMSConnectHomePage');

  const handleScrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      props.setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        props.isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#007ce1] flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Icon icon="mdi:flash" width={24} />
            </div>
            <span className="text-xl font-bold text-black tracking-tight">TTMSConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleScrollToSection(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
              >
                {t(link.nameKey)}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/sign-in/" className="text-sm font-medium text-black hover:text-black transition-colors">
              {t('nav_log_in')}
            </Link>
            <Link
              href="/sign-up/"
              className="bg-[#007ce1] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-all hover:shadow-lg hover:shadow-[#007ce1]/20"
            >
              {t('nav_get_started')}
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => props.setIsMobileMenuOpen(!props.isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon
              icon={props.isMobileMenuOpen ? 'solar:close-circle-bold' : 'solar:hamburger-menu-linear'}
              width={28}
            />
          </button>
        </div>
      </div>

      {props.isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-600 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={e => handleScrollToSection(e, link.href)}
              >
                {t(link.nameKey)}
              </a>
            ))}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <Link
                href="/sign-in/"
                className="text-center py-2.5 font-medium text-black border border-gray-200 rounded-xl hover:bg-gray-50"
                onClick={() => props.setIsMobileMenuOpen(false)}
              >
                {t('nav_log_in')}
              </Link>
              <Link
                href="/sign-up/"
                className="text-center py-2.5 font-medium text-white bg-[#007ce1] rounded-xl hover:bg-[#007ce1]"
                onClick={() => props.setIsMobileMenuOpen(false)}
              >
                {t('nav_get_started')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
