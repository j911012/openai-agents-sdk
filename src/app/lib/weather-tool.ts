import { tool } from "@openai/agents";
import { z } from "zod";

// 天気情報を取得するツール
export const getWeatherTool = tool({
  name: "get_weather",
  description:
    "指定された都市の天気情報を取得します。都市名を指定してください。",
  parameters: z.object({
    city: z.string().describe("天気を取得したい都市名（例：東京、大阪、札幌）"),
  }),
  async execute({ city }) {
    // チュートリアル用のサンプル天気データ
    const weatherData = {
      東京: { temp: "22°C", condition: "晴れ", humidity: "65%" },
      大阪: { temp: "25°C", condition: "曇り", humidity: "70%" },
      札幌: { temp: "15°C", condition: "雨", humidity: "80%" },
      福岡: { temp: "28°C", condition: "晴れ", humidity: "60%" },
      名古屋: { temp: "24°C", condition: "晴れ", humidity: "55%" },
    };

    const weather = weatherData[city as keyof typeof weatherData];

    if (weather) {
      return `${city}の天気情報：
温度: ${weather.temp}
天気: ${weather.condition}
湿度: ${weather.humidity}`;
    } else {
      return `${city}の天気情報は現在利用できません。東京、大阪、札幌、福岡、名古屋のいずれかを指定してください。`;
    }
  },
  errorFunction: (context, error) => {
    // エラーが発生した場合のユーザー向けメッセージ
    return `天気情報の取得中にエラーが発生しました。都市名を確認して再度お試しください。`;
  },
});
