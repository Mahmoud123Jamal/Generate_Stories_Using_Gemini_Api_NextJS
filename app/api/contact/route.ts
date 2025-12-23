import db from "@/db/index";
import { contactMessagesTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await db
      .insert(contactMessagesTable)
      .values({
        name,
        email,
        subject,
        message,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
