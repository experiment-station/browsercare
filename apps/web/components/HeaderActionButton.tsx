import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { HeaderActionButtonAuthenticated } from "./HeaderActionButtonAuthenticated";
import { HeaderActionButtonGuest } from "./HeaderActionButtonGuest";

export const HeaderActionButton = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    return <HeaderActionButtonGuest />;
  }

  return <HeaderActionButtonAuthenticated />;
};
