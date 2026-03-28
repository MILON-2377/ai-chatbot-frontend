/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChatHistory } from "@/src/service/chat-history/history.types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AuraThinking from "./AuraThingking";
import { useChatStream } from "./hooks/useChatStream";
import { ChatBubble } from "./ChatBubble";
import { ChevronDown } from "lucide-react";

interface Props {
  initialMessages: ChatHistory[];
  chatId: string;
  triggerStream: boolean;
}

export default function MessageList({
  initialMessages,
  chatId,
  triggerStream,
}: Props) {
  const [mounted] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Refs
  const hasTriggeredRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, streamingContent, isLoading, startStreaming } =
    useChatStream(chatId, initialMessages);

  // 2. Scroll Logic: Toggle visibility of "Scroll to Bottom" button
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesEndRef.current) return;

      // Check if the anchor div is within the viewport (with a 200px buffer)
      const rect = messagesEndRef.current.getBoundingClientRect();
      const isAtBottom = rect.top <= window.innerHeight + 200;

      setShowScrollButton(!isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Automated Scroll: Moves to bottom when messages update or during streaming
  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  useEffect(() => {
    if (!mounted) return;

    // We use "auto" during streaming for a tighter feel, and "smooth" for new static messages
    const handle = requestAnimationFrame(() => {
      scrollToBottom(streamingContent ? "auto" : "smooth");
    });
    return () => cancelAnimationFrame(handle);
  }, [messages.length, streamingContent, isLoading, mounted]);

  // 4. Custom Event Listener for ChatInput
  useEffect(() => {
    const handleNewMessage = (e: any) => {
      if (e.detail.chatId === chatId) startStreaming(e.detail.message);
    };
    window.addEventListener("aura-send-message", handleNewMessage);
    return () =>
      window.removeEventListener("aura-send-message", handleNewMessage);
  }, [chatId, startStreaming]);

  // 5. Initial Redirect Trigger Logic
  useEffect(() => {
    if (!mounted) return;

    if (
      triggerStream &&
      initialMessages.length > 0 &&
      hasTriggeredRef.current !== chatId
    ) {
      const lastUserMsg = [...initialMessages]
        .reverse()
        .find((m) => m.role === "USER");
      if (lastUserMsg) {
        hasTriggeredRef.current = chatId;
        setTimeout(() => {
          startStreaming(lastUserMsg.content, true);
          window.history.replaceState({}, "", window.location.pathname);
        }, 300);
      }
    }
  }, [chatId, triggerStream, initialMessages, startStreaming, mounted]);

  // Hydration Guard
  if (!mounted) {
    return (
      <div className="space-y-8 w-full pb-32">
        {initialMessages.map((msg) => (
          <ChatBubble key={msg.id} content={msg.content} role={msg.role} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full pb-32 relative">
      <AnimatePresence initial={false} mode="popLayout">
        {messages.map((msg) => {
          return (
            <ChatBubble key={msg.id} content={msg.content} role={msg.role} />
          );
        })}

        {isLoading && !streamingContent && (
          <motion.div
            key="thinking-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuraThinking />
          </motion.div>
        )}

        {streamingContent && (
          <ChatBubble
            key="streaming-state"
            content={streamingContent}
            role="ASSISTANT"
            isStreaming
          />
        )}
      </AnimatePresence>

      {/* Floating Scroll Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-28 right-6 md:right-10 p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform z-50 text-zinc-600 dark:text-zinc-300"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Anchor for scrolling */}
      <div
        ref={messagesEndRef}
        className="h-px w-full pointer-events-none opacity-0"
      />
    </div>
  );
}
