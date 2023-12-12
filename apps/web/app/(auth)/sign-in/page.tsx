import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex direction="column" gap="4" width="100%">
      <Heading size="6">Sign in</Heading>

      <Text color="gray">Welcome back, friend. Happy to see you again!</Text>

      <form action="/auth/sign-in" method="POST">
        <Flex direction="column">
          <Button highContrast size="2" type="submit">
            <GitHubLogoIcon />
            Sign in with GitHub
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
