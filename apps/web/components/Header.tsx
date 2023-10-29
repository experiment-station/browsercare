import {
  Card,
  Container,
  Flex,
  Heading,
  Inset,
  Separator,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import { HeaderActionButton } from "./HeaderActionButton";

export const Header = () => (
  <header className="sticky">
    <Flex direction="column" gap="4" mt="4">
      <Container>
        <Flex justify="between">
          <Link href="/">
            <Flex align="center" gap="2">
              <Card>
                <Inset>
                  <Image
                    alt="browser.care logo"
                    height="32"
                    src="/logo.svg"
                    width="32"
                  />
                </Inset>
              </Card>

              <Heading size="4" weight="medium">
                browsercare
              </Heading>
            </Flex>
          </Link>

          <HeaderActionButton />
        </Flex>
      </Container>

      <Separator orientation="horizontal" size="4" />
    </Flex>
  </header>
);
