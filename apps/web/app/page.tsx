import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";

export default async function Page() {
  return (
    <Flex
      direction="column"
      gap="4"
      style={{
        maxWidth: "var(--container-2)",
      }}
    >
      <Heading size="8">Develop web apps confidently.</Heading>

      <Text color="gray" size="4">
        We are building a <Strong>privacy-friendly</Strong> tool to help making
        data-driven decisions to fine-tune supported browser coverage of your
        web projects.
      </Text>

      <Text color="gray" size="4">
        Whether it&apos;s a website, a third-party integration, or a client-side
        library.
        <br />
        Let&apos;s take care of these browsers, together.
      </Text>

      <Flex gap="2" mt="2">
        <Button asChild size="3">
          <Link href="/beta">Sign up for private beta</Link>
        </Button>

        <Button asChild size="3" variant="outline">
          <Link href="/demo">
            See demo
            <ArrowRightIcon />
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
