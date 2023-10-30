"use client";

import { DashboardIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderActionButtonAuthenticated = () => {
  const pathname = usePathname();

  return pathname.startsWith("/projects") ? (
    <form action="/auth/sign-out" method="POST">
      <Button type="submit">
        <ExitIcon />
        Sign out
      </Button>
    </form>
  ) : (
    <Button asChild>
      <Link href="/projects">
        <DashboardIcon />
        Projects
      </Link>
    </Button>
  );
};
