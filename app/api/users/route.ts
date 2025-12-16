import db from "@/db";
import { usersTable } from "@/db/schema";
import { InsertUser, User } from "@/types/UserTable";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  const user: User[] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (user.length === 0) {
    const insertedUser: InsertUser[] = await db
      .insert(usersTable)
      .values({ email, name })
      .returning();
    return NextResponse.json({ insertedUser });
  }
  return NextResponse.json({ user });
}
