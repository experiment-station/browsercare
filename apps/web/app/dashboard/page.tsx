import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Box, Card, Heading } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { Suspense } from "react";

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
  const selectedProjectId = Number(searchParams?.project_id) || 1;
  const organizationsQuery = await supabase.from("organizations").select("*");
  const projectsQuery = await supabase.from("projects").select("*");
  const project = projectsQuery.data?.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <>
      <Heading>@browsercare/web</Heading>

      <div className="mt-6">
        <SelectProject
          organizations={organizationsQuery.data!}
          projects={projectsQuery.data!}
          selectedProjectId={selectedProjectId}
        />

        <Box mt="4">
          <Suspense
            fallback={<Card className="animate-pulse h-32" />}
            key={project!.id}
          >
            <Card>
              <Events project_id={project!.id} />
            </Card>
          </Suspense>
        </Box>
      </div>
    </>
  );
}
