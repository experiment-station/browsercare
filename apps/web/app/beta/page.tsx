import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const email = formData.get("email");
        if (typeof email !== "string") return;

        const supabase = createSupabaseServiceClient();
        await supabase.from("beta_signups").upsert({ email });

        redirect("/beta/thanks");
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
            <TextFieldInput
              name="email"
              placeholder="Your e-mail address"
              type="email"
            />
          </TextFieldRoot>

          <Button type="submit">Sign up</Button>
        </Flex>
      </Container>
    </form>
  );
}
