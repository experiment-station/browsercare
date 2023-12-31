import type { NextRequest } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient(cookies());
  const redirectURL = new URL('/auth/callback', request.url);
  redirectURL.searchParams.set('next', '/projects');

  const result = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: redirectURL.toString(),
    },
    provider: 'github',
  });

  return NextResponse.redirect(result.data.url!, {
    status: 301,
  });
}
