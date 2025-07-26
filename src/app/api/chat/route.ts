import { NextRequest, NextResponse } from "next/server";
import { run } from "@openai/agents";
import { createMultiAgent } from "@/app/lib/multi-agent";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log("Received message:", message);

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "OpenAI API キーが設定されていません" },
        { status: 500 }
      );
    }

    const agent = createMultiAgent();
    console.log("Multi-Agent created");

    const result = await run(agent, message);
    console.log("Final output:", result.finalOutput);

    return NextResponse.json({
      response: result.finalOutput,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
