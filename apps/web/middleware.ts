import { getSupabaseAuthSession } from "@/lib/supabase/auth";
import { type NextRequest, NextResponse } from "next/server";

import { enhanceHeaders } from "./lib/utils";

const publicRoutes = ["/", "/demo"];
const publicOnlyRoutes = ["/auth/sign-in", "/beta", "/beta/thanks"];

export async function middleware(request: NextRequest) {
  enhanceHeaders(request);

  const { authSession, response } = await getSupabaseAuthSession(request);
  const { pathname } = new URL(request.url);

  if (publicRoutes.includes(pathname)) {
    return response;
  }

  if (authSession.data.session) {
    if (publicOnlyRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  }

  if (publicOnlyRoutes.includes(pathname)) {
    return response;
  }

  return NextResponse.redirect(new URL("/auth/sign-in", request.url));
}

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg).*)",
  ],
};
