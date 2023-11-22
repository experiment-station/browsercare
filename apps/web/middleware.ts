import { getSupabaseAuthSession } from "@/lib/supabase/auth";
import { type NextRequest, NextResponse } from "next/server";

import { enhanceHeaders } from "./lib/utils";

const publicRoutes = [
  "/",

  "/auth/callback",
  "/auth/sign-in",
  "/auth/sign-out",

  "/sign-in",
  "/beta",
  "/beta/thanks",

  "/projects/demo",
];

export async function middleware(request: NextRequest) {
  enhanceHeaders(request);

  const { authSession, response } = await getSupabaseAuthSession(request);
  const { pathname } = new URL(request.url);

  if (publicRoutes.includes(pathname)) {
    return response;
  }

  if (authSession.data.session) {
    return response;
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg).*)",
  ],
};
