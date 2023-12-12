import { env } from '@/env.mjs';
import { createSupabaseServiceClient } from '@/lib/supabase/service';
import {
  Button,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from '@radix-ui/themes';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <Flex direction="column" gap="4">
      <Heading size="6">Join waitlist</Heading>

      <Text color="gray">
        Become a friend of browsercare and help us to develop the tool that you
        need.
      </Text>

      <form
        action={async (formData: FormData) => {
          'use server';
          const email = formData.get('email');
          if (typeof email !== 'string') return;

          const supabase = createSupabaseServiceClient();
          await supabase.from('beta_signups').upsert({ email });

          const maskedEmail = email.replace(/^(.{3}).*@/, '$1***@');
          await fetch(env.SLACK_POSTMAN_WEBHOOK_URL, {
            body: JSON.stringify({
              text: `👾 New waitlist signup for *browsercare*: ${maskedEmail}`,
            }),
            method: 'POST',
          });

          redirect('/waitlist/thanks');
        }}
      >
        <Flex direction="column" gap="2" width="100%">
          <TextFieldRoot>
            <TextFieldInput
              name="email"
              placeholder="Your e-mail address"
              required
              type="email"
            />
          </TextFieldRoot>

          <Button highContrast type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
