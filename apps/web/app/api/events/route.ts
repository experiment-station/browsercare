import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("project");
  const userAgent = request.headers.get("user-agent");

  if (!projectId || !userAgent) {
    return NextResponse.json(
      { message: 'Missing "project" or "user-agent"' },
      {
        status: 400,
      }
    );
  }

  try {
    const [organizationName, projectName] = projectId.split("/");
    const supabase = createSupabaseServiceClient();

    const { data: organization } = await supabase
      .from("organizations")
      .select("*")
      .eq("name", organizationName)
      .single();

    if (!organization) {
      return NextResponse.json(
        {
          message: "Organization not found",
        },
        {
          status: 404,
        }
      );
    }

    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("name", projectName)
      .single();

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        {
          status: 404,
        }
      );
    }

    await supabase.from("events").insert({
      project_id: project.id,
      user_agent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}
