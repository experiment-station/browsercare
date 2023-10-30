import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { Flex, Heading } from "@radix-ui/themes";
import { cookies } from "next/headers";

import { Events } from "./Events";

const DEMO_PROJECT_ID = "3";

type Props =
  | {
      id: string;
    }
  | {
      type: "demo";
    };

export const Project = async (props: Props) => {
  const supabase =
    "type" in props
      ? createSupabaseServiceClient()
      : createSupabaseServerClient(cookies());

  const query = await supabase
    .from("projects")
    .select("name, teams(name), events(*)")
    .eq("id", "type" in props ? DEMO_PROJECT_ID : props.id)
    .single();

  if (!query.data) {
    throw new Error("Project not found");
  }

  return (
    <Flex direction="column" gap="4">
      <Heading>
        {query.data.teams?.name}/{query.data.name}
      </Heading>

      <Events data={query.data.events} />
    </Flex>
  );
};
