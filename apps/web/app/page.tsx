import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createSupabaseServerClient(cookies());
  const eventsQuery = await supabase.from("events").select("*");

  return (
    <main className="flex justify-center items-center min-h-screen">
      {JSON.stringify(eventsQuery.data)}
    </main>
  );
}
