import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const Events = async (props: { project_id: number }) => {
  const supabase = createSupabaseServerClient(cookies());

  const eventsByProjectQuery = await supabase
    .from("events")
    .select("*")
    .eq("project_id", props.project_id);

  return <div>{eventsByProjectQuery.data?.length}</div>;
};
