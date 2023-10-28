"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button, Title } from "@tremor/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Page() {
  const supabase = createSupabaseBrowserClient();
  const callbackURL = new URL("/auth/callback", window.location.href);

  return (
    <div className="flex justify-center flex-col max-w-xs mx-auto">
      <Title>@browsercare/web</Title>

      <Button
        icon={GitHubLogoIcon}
        className="mt-4"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: callbackURL.toString(),
            },
          });
        }}
      >
        Sign in with GitHub
      </Button>
    </div>
  );
}
