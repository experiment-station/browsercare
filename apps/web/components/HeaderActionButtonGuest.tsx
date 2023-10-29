"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderActionButtonGuest = () => {
  const pathname = usePathname();

  if (pathname === "/demo") {
    return (
      <Button asChild>
        <Link href="/beta">Sign up for private beta</Link>
      </Button>
    );
  }
};
