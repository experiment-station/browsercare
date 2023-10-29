import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Flex
      align="center"
      direction="column"
      gap="6"
      mt="6"
      mx="auto"
      style={{
        maxWidth: "var(--container-2)",
      }}
    >
      <Heading align="center" size="8">
        Develop web apps confidently
      </Heading>

      <Text align="center" color="gray" size="4">
        We are building a <Strong>privacy-friendly</Strong> tool to help making
        data-driven decisions to adjust supported browser coverage of your web
        projects.
      </Text>

      <Text align="center" color="gray" size="4">
        Whether it&apos;s a website, a third-party integration, or a client-side
        library.
        <br />
        Let&apos;s take care of these browsers, together.
      </Text>

      <Box mt="2">
        {session === null ? (
          <Flex gap="2">
            <Button asChild size="3">
              <Link href="/beta">Sign up for the private beta</Link>
            </Button>

            <Button asChild size="3" variant="outline">
              <Link href="/demo">
                See the demo
                <ArrowRightIcon />
              </Link>
            </Button>
          </Flex>
        ) : (
          <Button asChild size="3">
            <Link href="/projects">
              Go to your projects
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </Box>
    </Flex>
  );
}
