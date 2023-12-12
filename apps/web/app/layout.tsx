import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import '@/components/theme-provider/styles.css';

import { gtAmerica } from './fonts';

export const metadata: Metadata = {
  description: '',
  title: 'browsercare',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={`${gtAmerica.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
