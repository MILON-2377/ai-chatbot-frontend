/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useCallback } from "react";
import { ChatHistory, MESSAGE_ROLES } from "@/src/service/chat-history/history.types";
import { streamChat } from "@/src/service/chat/chat.service";

export const useChatStream = (chatId: string, initialMessages: ChatHistory[]) => {
  const [messages, setMessages] = useState<ChatHistory[]>(initialMessages);
  const [streamingContent, setStreamingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStreaming = useCallback(async (userText: string, isInitialTrigger = false) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    setStreamingContent("");

    if (!isInitialTrigger) {
      setMessages(prev => [...prev, {
        id: `user-${chatId}-${Date.now()}`, // Stable prefix
        content: userText,
        role: MESSAGE_ROLES.USER,
        conversationId: chatId,
        createdAt: new Date().toISOString()
      }]);
    }

    try {
      let accumulated = "";
      await streamChat(
        { conversationId: chatId, message: userText },
        (chunk) => {
          setIsLoading(false); 
          accumulated += chunk;
          setStreamingContent(accumulated);
        },
        abortControllerRef.current.signal
      );

      if (accumulated) {
        setMessages(prev => [...prev, {
          id: `ai-${chatId}-${Date.now()}`,
          content: accumulated,
          role: MESSAGE_ROLES.ASSISTANT,
          conversationId: chatId,
          createdAt: new Date().toISOString()
        }]);
      }
    } catch (e: any) {
      if (e.name !== "AbortError") console.error("Stream Error:", e);
    } finally {
      setStreamingContent("");
      setIsLoading(false);
    }
  }, [chatId]);

  return { messages, streamingContent, isLoading, startStreaming, abortControllerRef };
};