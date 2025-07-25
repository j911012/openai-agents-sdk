"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          OpenAI Agents SDK チュートリアル
        </h1>

        {/* ツール機能の説明 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            🌤️ 新機能：天気ツール
          </h2>
          <p className="text-blue-700 text-sm">
            このAgentは天気情報を取得するツールを使用できます。以下のような質問を試してみてください：
          </p>
          <ul className="text-blue-600 text-sm mt-2 space-y-1">
            <li>• 「東京の天気を教えて」</li>
            <li>• 「大阪は今日どんな天気？」</li>
            <li>• 「札幌の気温は？」</li>
          </ul>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">
              メッセージを入力してください
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={3}
              placeholder="例：東京の天気を教えてください"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "送信中..." : "送信"}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <h3 className="font-medium mb-2">回答:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
