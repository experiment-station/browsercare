import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Button } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { AppHeaderActionButtonAuthenticated } from './app-header-action-button-authenticated';

export const AppHeaderActionButton = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    return (
      <Button asChild highContrast>
        <Link href="/waitlist">Join waitlist</Link>
      </Button>
    );
  }

  return <AppHeaderActionButtonAuthenticated />;
};
