import { NextRequest, NextResponse } from "next/server";
import { run } from "@openai/agents";
import { createBasicAgent } from "@/app/lib/agent";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    // デバック用
    console.log("Received message:", message);

    // 環境変数の確認
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "OpenAI API キーが設定されていません" },
        { status: 500 }
      );
    }

    const agent = createBasicAgent();
    // デバック用
    console.log("Agent created");

    const result = await run(agent, message);
    // デバック用
    console.log("Result:", result);

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
