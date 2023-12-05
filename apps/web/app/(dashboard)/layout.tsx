import type { PropsWithChildren } from 'react';

import { Box } from '@radix-ui/themes';

export default function Layout(props: PropsWithChildren) {
  return <Box>{props.children}</Box>;
}
