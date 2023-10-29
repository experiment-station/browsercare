import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createSupabaseServerClient(cookies());
  const projectsQuery = await supabase.from("projects").select("*");

  return (
    <>
      {projectsQuery.data?.map((project) => (
        <Box key={project.id} mb="4">
          <Link href={`/projects/${project.id}`}>{project.name}</Link>
        </Box>
      ))}
    </>
  );
}
