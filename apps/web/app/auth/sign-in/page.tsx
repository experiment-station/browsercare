import { Title, Button, Text } from "@tremor/react";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Page() {
  async function handleSignIn() {
    "use server";

    const supabase = createSupabaseServerClient(cookies());

    const result = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: new URL(
          "/auth/callback",
          process.env.NEXT_PUBLIC_VERCEL_URL
        ).toString(),
      },
    });

    redirect(result.data.url!);
  }

  return (
    <div className="flex justify-center flex-col max-w-xs mx-auto">
      <Title>@browsercare/web</Title>

      <form action={handleSignIn} className="mt-4">
        <Button type="submit" className="w-full">
          <span className="flex items-center justify-center flex-row gap-2">
            <GitHubLogoIcon />
            <span>Sign in with GitHub</span>
          </span>
        </Button>
      </form>
    </div>
  );
}
