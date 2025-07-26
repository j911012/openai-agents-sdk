import { Agent } from "@openai/agents";
import { getWeatherTool } from "./weather-tool";
import { translatorTool } from "./translator-tool";

// 天気専門Agent
export const createWeatherAgent = () => {
  return new Agent({
    name: "Weather Specialist",
    instructions: `あなたは天気の専門家です。天気に関する質問に詳しく回答してください。
    
専門分野：
- 都市の天気情報の取得
- 天気予報の解説
- 気候に関するアドバイス`,
    tools: [getWeatherTool],
  });
};

// 翻訳専門Agent
export const createTranslatorAgent = () => {
  return new Agent({
    name: "Translator Specialist",
    instructions: `あなたは翻訳の専門家です。言語の翻訳に関する質問に回答してください。
    
専門分野：
- 日本語をぱん語に翻訳`,
    tools: [translatorTool],
  });
};
