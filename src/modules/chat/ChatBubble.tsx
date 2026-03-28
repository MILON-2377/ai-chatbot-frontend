"use client";

import { motion } from "motion/react";
import { MESSAGE_ROLES } from "@/src/service/chat-history/history.types";
import MarkdownRenderer from "./MarkdownRenderer";

export const ChatBubble = ({ content, role, isStreaming = false }: { content: string, role: string, isStreaming?: boolean }) => {
  const isUser = role === MESSAGE_ROLES.USER;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] rounded-2xl p-4 ${
        isUser 
          ? "bg-blue-600/10 border border-blue-500/20 text-white" 
          : "bg-transparent text-slate-200 border border-white/5"
      } ${isStreaming ? "border-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.03)]" : ""}`}>
        <MarkdownRenderer content={content} />
        {isStreaming && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-4 ml-1 bg-blue-500 align-middle"
          />
        )}
      </div>
    </motion.div>
  );
};