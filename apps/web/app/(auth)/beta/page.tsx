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
      <Heading size="6">Join the private beta</Heading>

      <Text color="gray">
        Become a friend of browser.care and help us to develop the tool that you
        need to adjust your supported browser coverage.
      </Text>

      <form
        action={async (formData: FormData) => {
          "use server";
          const email = formData.get("email");
          if (typeof email !== "string") return;

          const supabase = createSupabaseServiceClient();
          await supabase.from("beta_signups").upsert({ email });

          const maskedEmail = email.replace(/^(.{3}).*@/, "$1***@");
          await fetch(process.env.SLACK_WEBHOOK_URL!, {
            body: JSON.stringify({
              text: `👾 New beta signup for *browser.care*: ${maskedEmail}`,
            }),
            method: "POST",
          });

          redirect("/beta/thanks");
        }}
      >
        <Flex direction="column" gap="2">
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                autoFocus
                name="email"
                placeholder="Your e-mail address"
                required
                type="email"
              />
            </TextFieldRoot>
          </Box>

          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </>
  );
}
