import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";

export default async function Page() {
  return (
    <form
      action={async () => {
        "use server";
        console.log("submit");
      }}
    >
      <Container
        style={{
          maxWidth: "var(--container-1)",
        }}
      >
        <Flex direction="column" gap="4">
          <Heading size="6">Sign up for the private beta</Heading>

          <Text color="gray">
            Become an early adopter and help us to develop the tool that you
            need to fine-tune your supported browser coverage.
          </Text>

          <TextFieldRoot>
            <TextFieldInput placeholder="Your e-mail address" type="email" />
          </TextFieldRoot>

          <Button type="submit">Sign up</Button>
        </Flex>
      </Container>
    </form>
  );
}
