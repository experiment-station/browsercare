'use client';

import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppHeaderActionButtonAuthenticated() {
  const pathname = usePathname();

  return pathname.startsWith('/projects') ? (
    <form action="/auth/sign-out" method="POST">
      <Button highContrast type="submit">
        <ExitIcon />
        Sign out
      </Button>
    </form>
  ) : (
    <Button asChild highContrast>
      <Link href="/projects">
        <DashboardIcon />
        Projects
      </Link>
    </Button>
  );
}
