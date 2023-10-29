import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createSupabaseServerClient(cookies());
  await supabase.auth.signOut();

  const redirectURL = new URL("/", request.url);
  return NextResponse.redirect(redirectURL.toString());
}
