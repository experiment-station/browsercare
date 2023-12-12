import type { PropsWithChildren } from 'react';

import { Flex, Separator } from '@radix-ui/themes';

import { AppContent } from './app-content';
import { AppHeader } from './app-header/app-header';

export function AppLayout(props: PropsWithChildren) {
  return (
    <Flex
      direction="column"
      gap="4"
      pt="4"
      style={{
        minHeight: '100vh',
      }}
    >
      <header className="sticky">
        <AppHeader />
      </header>

      <Separator orientation="horizontal" size="4" style={{ opacity: 0.5 }} />

      <main>
        <AppContent>{props.children}</AppContent>
      </main>

      {/* <footer style={{ marginTop: 'auto' }}>Footer</footer> */}
    </Flex>
  );
}
