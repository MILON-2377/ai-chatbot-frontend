"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InitialChatInput = ({
  onSendMessage,
  isLoading,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
      <motion.form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-[#111]/80 backdrop-blur-3xl border rounded-2xl p-2 shadow-2xl transition-all ${
          isLoading
            ? "border-blue-500/20 opacity-80"
            : "border-white/10 focus-within:border-blue-500/50"
        }`}
      >
        <input
          type="text"
          disabled={isLoading} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isLoading ? "Preparing your workspace..." : "Message Aura..."
          }
          className="flex-1 bg-transparent border-none focus:outline-none px-4 py-3 text-white placeholder-slate-500 text-sm disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`p-3 rounded-xl transition-all ${
            message.trim() && !isLoading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
        >
          {/* [3] Toggle between Icon and Spinner */}
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowUp size={18} strokeWidth={3} />
          )}
        </button>
      </motion.form>

      <p className="text-[10px] text-center text-slate-600 mt-3 uppercase tracking-widest font-medium">
        Aura AI can make mistakes. Check important info.
      </p>
    </div>
  );
};
