'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    content:
      'TTMSConnect has completely transformed how we manage our marketing fleet. The analytics are unmatched.',
    author: 'Sarah Johnson',
    role: 'Marketing Director at TechFlow',
    avatar: 'https://i.pravatar.cc/100?img=1',
    rating: 5,
  },
  {
    content:
      "The automation tools saved us 20+ hours a week. It's like having an extra team member working 24/7.",
    author: 'Michael Chen',
    role: 'Growth Lead at StartupX',
    avatar: 'https://i.pravatar.cc/100?img=11',
    rating: 5,
  },
  {
    content:
      'Intuitive interface, powerful features, and amazing support. Highly recommended for any marketing team.',
    author: 'Emma Davis',
    role: 'CMO at CreativeAgency',
    avatar: 'https://i.pravatar.cc/100?img=5',
    rating: 4,
  },
];

export function TestimonialsSection() {
  const t = useTranslations('TTMSConnectHomePage');

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t('testimonials_heading')}</h2>
          <p className="text-lg text-gray-600">{t('testimonials_subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative"
            >
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    icon={i < testimonial.rating ? 'solar:star-bold' : 'solar:star-linear'}
                    width={20}
                    className={i >= testimonial.rating ? 'text-gray-300' : ''}
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-black">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
