import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
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
      <Button asChild>
        <Link href="/auth/sign-in">
          <GitHubLogoIcon />
          Sign in with GitHub
        </Link>
      </Button>
    );
  }

  return <HeaderActionButtonAuthenticated />;
};
