import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const enhanceHeaders = (request: NextRequest) => {
  const headers = request.headers;
  headers.append("x-url", request.url);
  return request;
};

const getSupabaseAuthSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          request.cookies.delete({
            name,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );

  const authSession = await supabase.auth.getSession();

  return { authSession, response };
};

export async function middleware(request: NextRequest) {
  enhanceHeaders(request);

  const { authSession, response } = await getSupabaseAuthSession(request);
  const { pathname } = new URL(request.url);

  if (authSession.data.session || pathname.startsWith("/auth")) {
    return response;
  }

  return NextResponse.redirect(new URL("/auth/sign-in", request.url));
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
