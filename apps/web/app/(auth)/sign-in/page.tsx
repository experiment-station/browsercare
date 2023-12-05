import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <>
      <Heading size="6">Sign in</Heading>

      <Text color="gray">Welcome back, friend.</Text>

      <form action="/auth/sign-in" method="POST">
        <Flex direction="column">
          <Button type="submit">
            <GitHubLogoIcon />
            Sign in with GitHub
          </Button>
        </Flex>
      </form>
    </>
  );
}
