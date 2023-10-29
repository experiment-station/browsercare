import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button, Flex } from "@radix-ui/themes";
import { cookies } from "next/headers";
import Link from "next/link";

import { HeaderActionButtonAuthenticated } from "./HeaderActionButtonAuthenticated";

export const HeaderActionButton = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    return (
      <Flex align="center" gap="2">
        <Button asChild variant="outline">
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>

        <Button asChild>
          <Link href="/beta">Sign up</Link>
        </Button>
      </Flex>
    );
  }

  return <HeaderActionButtonAuthenticated />;
};
