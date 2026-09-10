import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const result = await model.generateContent(
      `You are Business AI, a practical AI business manager.
Help business owners with sales, marketing, finance, profit, pricing,
operations, strategy and growth.

Give clear, practical and actionable answers.

User question:
${message}`
    );

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json(
      { error: "Unable to connect to Business AI." },
      { status: 500 }
    );
  }
}