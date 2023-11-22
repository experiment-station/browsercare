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
      .select("id, is_active")
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

    if (!projectQuery.data.is_active) {
      return NextResponse.json(
        { message: "Project is not active" },
        {
          status: 400,
        }
      );
    }

    const uaParser = new UAParser(userAgent);
    const uaResult = uaParser.getResult();

    if (
      !uaResult.browser.name ||
      !uaResult.browser.version ||
      !uaResult.browser.major
    ) {
      return NextResponse.json(
        {
          message: "Could not parse user agent",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        browser_major: uaResult.browser.major,
        browser_name: uaResult.browser.name,
        browser_version: uaResult.browser.version,
        device_model: uaResult.device.model,
        device_type: uaResult.device.type || "desktop",
        device_vendor: uaResult.device.vendor,
        engine_name: uaResult.engine.name,
        engine_version: uaResult.engine.version,
        os_name: uaResult.os.name,
        os_version: uaResult.os.version,
        project_id: projectQuery.data.id,
        user_agent: userAgent,
      })
      .select("id, browser_name, browser_version, browser_major")
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({ event: data });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}
