import type { PropsWithChildren } from 'react';

import { Flex } from '@radix-ui/themes';

export default function Layout(props: PropsWithChildren) {
  return (
    <Flex
      direction="column"
      gap="4"
      mx="auto"
      style={{
        maxWidth: 'var(--container-1)',
      }}
    >
      {props.children}
    </Flex>
  );
}
