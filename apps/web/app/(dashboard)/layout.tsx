import { Box } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return <Box>{props.children}</Box>;
}
