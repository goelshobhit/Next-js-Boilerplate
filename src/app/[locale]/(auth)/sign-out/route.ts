import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { routing } from '@/libs/I18nRouting';

const AUTH_COOKIE = 'auth_session';

export async function GET(
  request: Request,
  props: { params: Promise<{ locale: string }> },
) {
  const { locale } = await props.params;
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);

  const path = locale && locale !== routing.defaultLocale ? `/${locale}/sign-in` : '/sign-in';
  return NextResponse.redirect(new URL(path, request.url));
}
