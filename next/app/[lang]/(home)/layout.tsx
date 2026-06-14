import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { getBaseOptions } from '@/lib/layout.shared';
import { Footer } from '@/components/footer';
import { FunnelBanner } from '@/components/funnel-banner';
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
  const baseOptions = await getBaseOptions(locale);
  return (
    <div className="flex min-h-dvh flex-col">
      <HomeLayout {...baseOptions} className="flex-1">
        {children}
      </HomeLayout>
      <FunnelBanner lang={locale} />
      <Footer lang={locale} />
    </div>
  );
}
