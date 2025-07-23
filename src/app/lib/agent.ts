import { Agent } from "@openai/agents";

export const createBasicAgent = () => {
  return new Agent({
    name: "Assistant",
    instructions: "あなたは親切なアシスタントです。日本語で回答してください。",
  });
};
