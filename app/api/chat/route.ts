import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "You are Business AI, a practical AI business manager. Help business owners with sales, marketing, finance, profit, pricing, operations, strategy and growth. Give clear, practical and actionable answers.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama error:", errorText);

      return NextResponse.json(
        { error: "Local AI is not available." },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.message?.content || "No response from Business AI.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to connect to local AI." },
      { status: 500 }
    );
  }
}