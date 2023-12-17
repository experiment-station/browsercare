import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Flex
      align="center"
      direction="column"
      gap="5"
      mx="auto"
      py="5"
      style={{
        maxWidth: 'var(--container-2)',
      }}
    >
      <Heading align="center" size="8">
        Develop web apps confidently
      </Heading>

      <Text align="center" color="gray">
        We are building a <Strong>privacy-friendly</Strong> tool to help making
        data-driven decisions to adjust browser coverage of your web projects.
      </Text>

      <Text align="center" color="gray">
        Whether it&apos;s a website, a third-party integration, or a client-side
        library.
        <br />
        Let&apos;s take care of these browsers, together.
      </Text>

      <Box mt="2">
        {session === null ? (
          <Flex
            direction={{
              initial: 'column',
              xs: 'row',
            }}
            gap="2"
          >
            <Button asChild highContrast>
              <Link href="/waitlist">Join waitlist</Link>
            </Button>

            <Button asChild highContrast variant="soft">
              <Link href="/projects/demo">
                See the demo
                <ArrowRightIcon />
              </Link>
            </Button>
          </Flex>
        ) : (
          <Button asChild highContrast>
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
