"use client";

import { DashboardIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderActionButtonAuthenticated = () => {
  const pathname = usePathname();

  return pathname.startsWith("/dashboard") ? (
    <Button asChild>
      <Link href="/auth/sign-out">
        <ExitIcon />
        Sign out
      </Link>
    </Button>
  ) : (
    <Button asChild>
      <Link href="/dashboard">
        <DashboardIcon />
        Go to Dashboard
      </Link>
    </Button>
  );
};
