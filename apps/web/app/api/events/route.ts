import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");
  const userAgent = request.headers.get("user-agent");

  if (!project) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true, project, userAgent });
}
