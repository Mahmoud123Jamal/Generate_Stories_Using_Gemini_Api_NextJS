import db from "@/db";
import { storysTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");

  if (!email || !userId) {
    return NextResponse.json({ error: "Missing information" }, { status: 400 });
  }

  try {
    await db.delete(storysTable).where(eq(storysTable.email, email));
    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({
      message: "Account and data deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: "Error during deletion" },
      { status: 500 }
    );
  }
}
