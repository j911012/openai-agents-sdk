import { tool } from "@openai/agents";
import { z } from "zod";

export const translatorTool = tool({
  name: "translator",
  description:
    "テキストをぱん語に翻訳します。ぱん語は独自の言語で、このツールでのみ翻訳可能です。",
  parameters: z.object({
    text: z.string().describe("翻訳したいテキスト"),
    targetLanguage: z.string().describe("翻訳先の言語（ぱん語）"),
  }),
  async execute({ text, targetLanguage }) {
    // チュートリアル用のぱん語翻訳
    const translations = {
      こんにちは: "hogehoge",
      おはよう: "fugafuga",
      ありがとう: "piyopiyo",
    };

    const translation =
      translations[text as keyof typeof translations] ||
      `[翻訳: ${text} → ${targetLanguage}]`;
    return `翻訳結果: ${text} → ${translation}`;
  },
  errorFunction: (context, error) => {
    return "翻訳中にエラーが発生しました。テキストを確認して再度お試しください。";
  },
});
