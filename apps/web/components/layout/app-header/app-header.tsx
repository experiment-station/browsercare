import { Card, Container, Flex, Heading, Inset } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';

import { AppHeaderActionButton } from './app-header-action-button';

export function AppHeader() {
  return (
    <Flex direction="column" gap="4">
      <Container
        px={{
          initial: '6',
          lg: '0',
        }}
        size="4"
      >
        <Flex justify="between">
          <Flex align="center" asChild gap="2">
            <Link
              href="/"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Card>
                <Inset>
                  <Image
                    alt="browsercare logo"
                    height="32"
                    src="/logo.svg"
                    style={{ display: 'block' }}
                    width="32"
                  />
                </Inset>
              </Card>

              <Heading size="4">browser.care</Heading>
            </Link>
          </Flex>

          <AppHeaderActionButton />
        </Flex>
      </Container>
    </Flex>
  );
}
