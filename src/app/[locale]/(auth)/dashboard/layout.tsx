import { setRequestLocale } from 'next-intl/server';
import { DashboardLayoutClient } from '@/components/layout/dashboard/DashboardLayoutClient';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <DashboardLayoutClient>{props.children}</DashboardLayoutClient>;
}
