import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <>
      <Heading size="6">Sign up for the private beta</Heading>

      <Text color="gray">
        Become an early adopter and help us to develop the tool that you need to
        fine-tune your supported browser coverage.
      </Text>

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
        <Flex direction="column" gap="2">
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                name="email"
                placeholder="Your e-mail address"
                type="email"
              />
            </TextFieldRoot>
          </Box>

          <Button type="submit">Sign up</Button>
        </Flex>
      </form>
    </>
  );
}
