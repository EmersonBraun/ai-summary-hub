import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'AI Summary Hub',
    template: '%s | AI Summary Hub',
  },
  description: 'Open AI knowledge wiki: fundamentals, agents, MLOps, prompt engineering, and more.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
