import { getSupabaseAuthSession } from "@/lib/supabase/auth";
import { type NextRequest, NextResponse } from "next/server";

import { enhanceHeaders } from "./lib/utils";

const publicRoutes = [
  "/",
  "/auth/callback",
  "/auth/sign-in",
  "/auth/sign-out",
  "/beta",
  "/beta/thanks",
  "/demo",
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

  return NextResponse.redirect(new URL("/", request.url));
}

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg).*)",
  ],
};
