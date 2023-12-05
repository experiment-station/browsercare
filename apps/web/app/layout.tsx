import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Header } from '@/components/header/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Container, Theme } from '@radix-ui/themes';

import { gtAmerica } from './fonts';
import './style.css';

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
      <link href="/favicon.ico" rel="icon" sizes="any" />

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Theme
            accentColor="mint"
            grayColor="gray"
            radius="medium"
            scaling="100%"
          >
            <Header />

            <Container
              my="6"
              px={{
                initial: '6',
                lg: '0',
              }}
              size="4"
            >
              {children}
            </Container>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
