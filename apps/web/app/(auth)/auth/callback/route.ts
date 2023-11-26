import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ALLOWED_USER_EMAILS = ["altay@zebrastik.com"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
      const cookieStore = cookies();
      const supabase = createSupabaseServerClient(cookieStore);

      const { data } = await supabase.auth.exchangeCodeForSession(code);

      if (ALLOWED_USER_EMAILS.includes(data?.user?.email ?? "")) {
        return NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url));
      }
    }

    return NextResponse.redirect(new URL("/waitlist", request.url));
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
