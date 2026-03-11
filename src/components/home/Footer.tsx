'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

export function Footer() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#007ce1] flex items-center justify-center text-white">
                <Icon icon="mdi:flash" width={18} />
              </div>
              <span className="text-xl font-bold text-black">TTMSConnect</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">{t('footer_tagline')}</p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-[#fff] hover:text-black transition-colors" aria-label="Twitter">
                <Icon icon="mdi:twitter" width={24} />
              </a>
              <a href="#" className="text-[#fff] hover:text-black transition-colors" aria-label="GitHub">
                <Icon icon="mdi:github" width={24} />
              </a>
              <a href="#" className="text-[#fff] hover:text-black transition-colors" aria-label="LinkedIn">
                <Icon icon="mdi:linkedin" width={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">{t('footer_product')}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-black transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">{t('footer_company')}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about/" className="hover:text-black transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">{t('footer_legal')}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>{t('footer_copyright')}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t('footer_systems')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
