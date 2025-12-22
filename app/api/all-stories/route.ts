export const dynamic = "force-dynamic";
import db from "@/db";
import { storysTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const stories = await db
      .select()
      .from(storysTable)
      .orderBy(desc(storysTable.id));

    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error fetching general stories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
