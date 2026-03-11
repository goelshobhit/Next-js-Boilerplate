import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

const AUTH_COOKIE = 'auth_session';

type RootPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RootPage(props: RootPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE)?.value === '1';

  if (isAuthenticated) {
    redirect('/dashboard');
  }

  redirect('/sign-in');
}
