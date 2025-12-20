import db from "@/db";
import { storysTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import OpenAI from "openai";
import { storyPrompt } from "@/lib/storyPrompt";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { subject, type, ageGroup } = await req.json();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //Open AI API
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: storyPrompt({ subject, type, ageGroup }),
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content ?? "";

    let ResJson: {
      story?: {
        content?: string;
        imagePrompt?: string;
      };
    };

    try {
      ResJson = JSON.parse(responseText.replace(/```json|```/g, "").trim());
    } catch {
      ResJson = {
        story: {
          content: responseText,
          imagePrompt: `illustration for ${subject} story for ${ageGroup}`,
        },
      };
    }

    // call imageGeneration
    const imagePrompt =
      ResJson.story?.imagePrompt ?? `illustration for ${subject} story`;

    const image = await imageGeneration(imagePrompt);
    // DB
    const result = await db
      .insert(storysTable)
      .values({
        storyId: uuid4(),
        subject,
        type,
        ageGroup,
        imageUrl: image,
        content: ResJson,
        email: user.primaryEmailAddress?.emailAddress,
      })
      .returning();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { success: false, error: "AI generation failed" },
      { status: 500 }
    );
  }
}
// image generation
const imageGeneration = async (prompt: string) => {
  const BASE_URL = "https://aigurulab.tech";

  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl",
      aspectRatio: "1:1",
    },
    {
      headers: {
        "x-api-key": process.env.GURU_LAB_API_KEY!,
        "Content-Type": "application/json",
      },
    }
  );

  return result.data.image;
};
