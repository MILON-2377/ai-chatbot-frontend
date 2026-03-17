"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { ArrowUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatInput({ chatId }: { chatId?: string }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    if (!chatId) {
      // 1. Create new chat and get ID
      const response = await fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const { id } = await response.json();

      // 2. Redirect to new thread
      router.push(`/chat/${id}`);
    } else {
      // 3. Just stream the message in current thread
      // This is where you'd trigger your streaming handler
      console.log("Sending to existing chat:", chatId);
    }

    setInput("");
    setIsLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      layout
      className="relative w-full rounded-2xl bg-[#111]/90 backdrop-blur-xl border border-white/10 shadow-2xl p-1.5 focus-within:border-blue-500/50 transition-colors"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        rows={1}
        className="w-full max-h-[200px] bg-transparent border-none focus:outline-none px-4 py-3 text-white placeholder-slate-500 resize-none"
      />

      <div className="flex justify-end px-2 pb-1">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-xl bg-blue-600 text-white disabled:bg-slate-800 disabled:text-slate-500 transition-all hover:scale-105"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowUp size={18} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
