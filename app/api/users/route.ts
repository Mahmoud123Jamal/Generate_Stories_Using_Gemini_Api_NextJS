import db from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@/types/UserTable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const result: User[] = await db
      .insert(usersTable)
      .values({ email, name })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: { name: name },
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
