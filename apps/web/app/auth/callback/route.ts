import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
      const cookieStore = cookies();
      const supabase = createSupabaseServerClient(cookieStore);

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (data.user?.email !== "altay@zebrastik.com") {
        throw new Error("You are not allowed to sign in.");
      }

      if (!error) {
        return NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url));
      }
    }

    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
