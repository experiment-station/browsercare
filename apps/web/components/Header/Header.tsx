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
      <Container
        px={{
          initial: "6",
          lg: "0",
        }}
        size="3"
      >
        <Flex justify="between">
          <Flex align="center" asChild gap="2">
            <Link
              href="/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Card>
                <Inset>
                  <Image
                    alt="browser.care logo"
                    height="32"
                    src="/logo.svg"
                    style={{ display: "block" }}
                    width="32"
                  />
                </Inset>
              </Card>

              <Heading size="4" weight="medium">
                browsercare
              </Heading>
            </Link>
          </Flex>

          <HeaderActionButton />
        </Flex>
      </Container>

      <Separator orientation="horizontal" size="4" />
    </Flex>
  </header>
);
