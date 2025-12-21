import db from "@/db";
import { storysTable } from "@/db/schema";
import { storyTable } from "@/types/StoryType";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stories: storyTable[] = await db
    .select()
    .from(storysTable)
    .where(eq(storysTable.email, user.primaryEmailAddress?.emailAddress!));
  return NextResponse.json({ stories });
}
