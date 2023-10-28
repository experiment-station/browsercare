import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { EventsTable } from "./EventsTable";

export const Events = async (props: { project_id: number }) => {
  const supabase = createSupabaseServerClient(cookies());

  const eventsByProjectQuery = await supabase
    .from("events")
    .select("*")
    .eq("project_id", props.project_id);

  return <EventsTable events={eventsByProjectQuery.data || []} />;
};
