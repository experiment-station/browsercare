import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";
import { cookies } from "next/headers";

import { Events } from "./_components/Events";
import { SelectProject } from "./_components/SelectProject";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    project_id?: string;
  };
}) {
  const supabase = createSupabaseServerClient(cookies());
  const teamsQuery = await supabase.from("teams").select("*");
  const projectsQuery = await supabase.from("projects").select("*");
  const selectedProjectId = Number(
    searchParams?.project_id || projectsQuery.data![0].id
  );

  return (
    <>
      {projectsQuery.data!.length > 1 ? (
        <SelectProject
          projects={projectsQuery.data!}
          selectedProjectId={selectedProjectId}
          teams={teamsQuery.data!}
        />
      ) : null}

      <Box mt="4">
        <Events project_id={selectedProjectId} />
      </Box>
    </>
  );
}
