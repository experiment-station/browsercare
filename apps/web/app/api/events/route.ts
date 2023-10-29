import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { UAParser } from "@ua-parser-js/pro-business";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");
  const userAgent = request.headers.get("user-agent");

  if (!project || !userAgent) {
    return NextResponse.json(
      { message: 'Missing "project" or "user-agent"' },
      {
        status: 400,
      }
    );
  }

  try {
    const supabase = createSupabaseServiceClient();
    const [teamName, projectName] = project.split("/");

    const teamQuery = await supabase
      .from("teams")
      .select("id")
      .eq("name", teamName)
      .single();

    if (!teamQuery.data) {
      return NextResponse.json(
        { message: "Project not found" },
        {
          status: 404,
        }
      );
    }

    const projectQuery = await supabase
      .from("projects")
      .select("id")
      .eq("name", projectName)
      .single();

    if (!projectQuery.data) {
      return NextResponse.json(
        { message: "Project not found" },
        {
          status: 404,
        }
      );
    }

    const uaParser = new UAParser(userAgent);
    if (!uaParser.getBrowser().name) {
      return NextResponse.json(
        {
          message: "Invalid user agent",
        },
        {
          status: 400,
        }
      );
    }

    await supabase.from("events").insert({
      project_id: projectQuery.data.id,
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
