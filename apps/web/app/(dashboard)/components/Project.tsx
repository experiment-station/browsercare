import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { Flex, Heading, Text } from "@radix-ui/themes";
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
    .limit(1, { foreignTable: "teams" })
    .limit(1000, { foreignTable: "events" })
    .order("created_at", { ascending: false, foreignTable: "events" })
    .maybeSingle();

  if (!query.data) {
    throw new Error("Project not found");
  }

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="2">
        <Heading>
          {query.data.teams?.name}/{query.data.name}
        </Heading>

        <Text color="gray">
          Displaying data based on the last {query.data.events.length} events.
        </Text>
      </Flex>

      <Events data={query.data.events} />
    </Flex>
  );
};
