import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Card, Title, Text, Grid, Bold } from "@tremor/react";
import { Events } from "@/components/Events";
import { Suspense } from "react";
import { ProjectSelector } from "@/components/ProjectSelector";

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
      <Title>@browsercare/web</Title>

      <div className="mt-6">
        <ProjectSelector
          projects={projectsQuery.data!}
          organizations={organizationsQuery.data!}
          selectedProjectId={selectedProjectId}
        />

        <Card className="mt-2">
          <Suspense key={project!.id} fallback={<div>Loading...</div>}>
            <Events project_id={project!.id} />
          </Suspense>
        </Card>
      </div>
    </>
  );
}
