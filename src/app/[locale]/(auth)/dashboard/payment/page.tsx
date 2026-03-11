import { setRequestLocale } from 'next-intl/server';
import Content from './Content';

export default async function PaymentPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}
