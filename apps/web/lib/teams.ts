import { Tables } from "@/types/supabase/database";
import { User } from "@supabase/supabase-js";

import { createSupabaseServiceClient } from "./supabase/service";

export const addTeamMember = async (
  userId: User["id"],
  teamId: Tables<"teams">["id"] = 2
) => {
  const supabase = createSupabaseServiceClient();

  await supabase.from("members").upsert({
    team_id: teamId,
    user_id: userId,
  });
};
