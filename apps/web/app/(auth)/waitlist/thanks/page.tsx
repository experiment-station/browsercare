import { Flex, Heading, Link, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex direction="column" gap="4">
      <Heading size="6">Thank you!</Heading>

      <Text color="gray">
        We will get back to you as soon as we can.
        <br />
        <Link href="https://youtube.com/watch?v=uGEDSGCUkXk" target="_blank">
          Here&apos;s great set from The Blaze
        </Link>{' '}
        to enjoy the rest of your day.
      </Text>
    </Flex>
  );
}
