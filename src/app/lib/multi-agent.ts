import { Agent } from "@openai/agents";
import { createWeatherAgent } from "./specialist-agents";
import { createTranslatorAgent } from "./specialist-agents";

export const createMultiAgent = () => {
  // 専門Agentを作成
  const weatherAgent = createWeatherAgent();
  const translatorAgent = createTranslatorAgent();

  // メインAgent（コーディネーター）
  return Agent.create({
    name: "Multi-Agent Coordinator",
    instructions: `あなたは複数の専門Agentを管理するコーディネーターです。

利用可能な専門Agent：
1. Weather Specialist - 天気に関する質問
2. Translator Specialist - 翻訳に関する質問

質問の内容に応じて適切な専門Agentに委譲してください。

質問の分類：
- 天気、気候、都市の天気 → Weather Specialist
- 翻訳、言語、英語、日本語 → Translator Specialist

専門Agentからの回答を受け取ったら、ユーザーに分かりやすく説明してください。`,
    handoffs: [weatherAgent, translatorAgent],
  });
};
