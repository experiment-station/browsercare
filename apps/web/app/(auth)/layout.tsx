import type { PropsWithChildren } from 'react';

import { Card, Container, Flex, Inset } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Container size="1">
      <Flex
        direction="column"
        gap="4"
        mx="auto"
        style={{
          alignItems: 'start',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Link href="/" title="Go to home page">
          <Card>
            <Inset>
              <Image
                alt="browsercare logo"
                height="48"
                src="/logo.svg"
                style={{ display: 'block' }}
                width="48"
              />
            </Inset>
          </Card>
        </Link>

        {props.children}
      </Flex>
    </Container>
  );
}
