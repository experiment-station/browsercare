import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, Title } from "@tremor/react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  async function handleSignIn() {
    "use server";

    const supabase = createSupabaseServerClient(cookies());
    const redirectURL = new URL("/auth/callback", headers().get("x-url")!);

    const result = await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: redirectURL.toString(),
      },
      provider: "github",
    });

    redirect(result.data.url!);
  }

  return (
    <div className="flex justify-center flex-col max-w-xs mx-auto">
      <Title>@browsercare/web</Title>

      <form action={handleSignIn} className="mt-4">
        <Button className="w-full" type="submit">
          <span className="flex items-center justify-center flex-row gap-2">
            <GitHubLogoIcon />
            <span>Sign in with GitHub</span>
          </span>
        </Button>
      </form>
    </div>
  );
}
