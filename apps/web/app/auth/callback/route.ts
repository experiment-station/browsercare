import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addTeamMember } from "@/lib/teams";
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

      if (!error) {
        await addTeamMember(data.user.id);
        return NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url));
      }
    }

    throw new Error("Code is not provided.");
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
