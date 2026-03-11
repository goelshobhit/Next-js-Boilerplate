import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type UserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: UserProfilePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function UserProfilePage(props: UserProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="my-6 lg:-ml-12">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-black">Profile</h2>
        <p className="mt-2 text-sm text-gray-500">User profile settings.</p>
      </div>
    </div>
  );
}
