import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
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
    <DocsLayout tree={source.getPageTree(lang)} {...baseOptions}>
      {children}
      <Footer lang={locale} />
    </DocsLayout>
  );
}
