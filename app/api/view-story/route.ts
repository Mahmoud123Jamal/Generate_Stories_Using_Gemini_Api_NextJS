import db from "@/db";
import { storysTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const storyId = searchParams.get("storyId");

    console.log("Fetching Story ID:", storyId);

    if (!storyId) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const res = await db
      .select()
      .from(storysTable)
      .where(eq(storysTable.storyId, storyId));

    if (res.length === 0) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(res[0]);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
