"use client";

import { motion } from "motion/react";
import { Terminal, Image as ImageIcon, Globe } from "lucide-react";
import { InitialChatInput } from "@/src/modules/chat/IntialChatInput";
import { createChatAction } from "@/src/service/chat/chat.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const suggestions = [
  { icon: <Terminal size={16} />, text: "Help me debug a Next.js middleware" },
  { icon: <ImageIcon size={16} />, text: "Generate a futuristic dashboard UI" },
  { icon: <Globe size={16} />, text: "Summarize the latest AI news" },
];

export default function NewChatPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (isCreating) return;

    setIsCreating(true);
    const res = await createChatAction(message);

    if (res.error) {
      toast.error("Failed to send message");
      setIsCreating(false);
      return;
    }

    if (res.success) {
      toast.success("Ai responsing..");

      router.refresh();

      const data = res.data;
      return router.push(`/chat/${data?.id}?isNew=true`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[80vh] px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          How can I help you <span className="text-blue-400">create</span>{" "}
          today?
        </h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Start a new conversation or pick a quick action to begin your
          workflow.
        </p>
      </motion.div>

      {/* Suggestion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {suggestions.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSendMessage(item.text)}
            className="flex flex-col items-start p-5 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/6 hover:border-white/10 transition-all text-left group"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="text-sm font-medium text-slate-300 leading-relaxed">
              {item.text}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Floating Input Component */}
      <InitialChatInput
        onSendMessage={handleSendMessage}
        isLoading={isCreating}
      />
    </div>
  );
}
