import { Events } from "@/components/Dashboard/Events";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { Box } from "@radix-ui/themes";

export default async function Page() {
  const supabase = createSupabaseServiceClient();
  const eventsByProjectQuery = await supabase
    .from("events")
    .select("*")
    .eq("project_id", 3);

  return (
    <Box mt="4">
      <Events data={eventsByProjectQuery.data || []} />
    </Box>
  );
}
