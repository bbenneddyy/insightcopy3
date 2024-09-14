import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// reguest is required according to https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const user = params.slug;
  if (user && user.length) {
    const publicDir = path.join(process.cwd(), "assets");
    const fileUrl = user;
    const filePath = path.join(publicDir, fileUrl);

    try {
      const data = await fs.readFile(filePath);
      const headers = new Headers()
      headers.set("content-type", "image");
      return new NextResponse(data, {status: 200, headers});
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "No user" }, { status: 400 });
  }
}
