import { Agent } from "@openai/agents";
import { getWeatherTool } from "./weather-tool";

export const createBasicAgent = () => {
  return new Agent({
    name: "Assistant",
    instructions: `あなたは親切なアシスタントです。日本語で回答してください。

利用可能なツール：
- 天気ツール: 都市の天気情報を取得できます

ツールの使用方法：
- ユーザーが天気について質問した場合は、適切な都市名で天気ツールを使用してください
- 例：「東京の天気を教えて」「大阪は今日どんな天気？」など

ツールを使用する際は、ユーザーの質問に基づいて適切な都市名を推測し、天気情報を取得してから回答してください。`,
    tools: [getWeatherTool],
  });
};
