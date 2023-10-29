import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createSupabaseServerClient(cookies());
  const redirectURL = new URL("/auth/callback", request.url);
  redirectURL.searchParams.set("next", "/projects");

  const result = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: redirectURL.toString(),
    },
    provider: "github",
  });

  return NextResponse.redirect(result.data.url!);
}
