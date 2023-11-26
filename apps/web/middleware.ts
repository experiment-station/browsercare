import { getSupabaseAuthSession } from "@/lib/supabase/auth";
import { type NextRequest, NextResponse } from "next/server";

import { enhanceHeaders } from "./lib/utils";

const publicRoutes = [
  "/",

  "/auth/callback",
  "/auth/sign-in",
  "/auth/sign-out",

  "/sign-in",
  "/waitlist",
  "/waitlist/thanks",

  "/projects/demo",
  "/api/events",
];

export async function middleware(request: NextRequest) {
  enhanceHeaders(request);

  const { pathname } = new URL(request.url);

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  const { authSession, response } = await getSupabaseAuthSession(request);
  if (authSession.data.session) {
    return response;
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png|logo.svg).*)"],
};
