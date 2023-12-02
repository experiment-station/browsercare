import { Flex } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

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
