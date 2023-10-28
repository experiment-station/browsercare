"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function Page() {
  const supabase = createSupabaseBrowserClient();
  const callbackURL = new URL("/auth/callback", window.location.href);

  return (
    <div>
      <button
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
      </button>
    </div>
  );
}
