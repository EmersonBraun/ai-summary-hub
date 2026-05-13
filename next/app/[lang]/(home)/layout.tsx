import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { Footer } from '@/components/footer';
import type { Locale } from '@/lib/site';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = lang === 'pt-BR' ? 'pt-BR' : 'en';
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Footer lang={locale} />
    </HomeLayout>
  );
}
