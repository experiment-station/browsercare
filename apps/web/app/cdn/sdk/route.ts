import { NextRequest, NextResponse } from "next/server";

const CDN_URL = "https://unpkg.com/@browsercare/sdk";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  return NextResponse.redirect(`${CDN_URL}${url.search}`);
}
