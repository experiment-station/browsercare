import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient(cookies());
  await supabase.auth.signOut();

  return NextResponse.redirect(new URL('/', request.url).toString(), {
    status: 301,
  });
}
