"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setReply(data.reply);
    } catch (error) {
      setReply("Sorry, something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

        <header className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Business <span className="text-blue-400">AI</span>
            </h1>
            <p className="text-sm text-slate-400">
              Your AI Business Manager
            </p>
          </div>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
            Sign In
          </button>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            🚀 AI-powered business assistant
          </div>

          <h2 className="max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            Run your business smarter with{" "}
            <span className="text-blue-400">Business AI</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Ask questions, analyze your business, improve sales, understand
            profits and make better decisions with AI.
          </p>

          <div className="mt-10 w-full max-w-3xl">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      askAI();
                    }
                  }}
                  placeholder="Ask Business AI anything about your business..."
                  className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
                />

                <button
                  onClick={askAI}
                  disabled={loading}
                  className="rounded-xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Thinking..." : "Ask AI"}
                </button>
              </div>
            </div>

            {reply && (
              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-left">
                <h3 className="mb-3 font-semibold text-blue-400">
                  Business AI
                </h3>
                <p className="whitespace-pre-wrap text-slate-200">
                  {reply}
                </p>
              </div>
            )}

            <p className="mt-3 text-xs text-slate-500">
              Business AI can help with sales, marketing, finance and business
              strategy.
            </p>
          </div>

          <div className="mt-14 grid w-full max-w-4xl gap-4 md:grid-cols-4">
            <Feature title="💡 Business Advice" />
            <Feature title="📊 Sales Analysis" />
            <Feature title="💰 Profit Analysis" />
            <Feature title="📣 Marketing Help" />
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 Business AI. Your AI Business Manager.
        </footer>
      </div>
    </main>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
      {title}
    </div>
  );
}