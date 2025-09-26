import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { eventNumber } from "@/utils/config";

function jsonToCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (val: unknown) => {
    const str = val == null ? "" : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape((row as any)[h])).join(","));
  }
  return lines.join("\n");
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const expected = process.env.SHEETS_PULL_SECRET;
  if (!expected || secret !== expected) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  try {
    const registrations = await db.registration.findMany({
      where: { archive: false, event_number: eventNumber },
      orderBy: { created_at: "asc" },
      select: {
        created_at: true,
        education: true,
        title: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        site: true,
        status: true,
      },
    });

    const rows = registrations.map((r) => ({
      timestamp: r.created_at.toISOString(),
      education: r.education,
      title: r.title,
      firstname: r.firstname,
      lastname: r.lastname,
      email: r.email,
      phone: r.phone,
      site: r.site,
      status: r.status,
    }));

    const csv = jsonToCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (e) {
    console.error(e);
    return new NextResponse("error", { status: 500 });
  }
}
