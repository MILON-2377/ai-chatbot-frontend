"use client";
import { motion } from "motion/react";
import { Terminal, Image as ImageIcon, Globe, Zap } from "lucide-react";

const suggestions = [
  { icon: <Terminal size={16} />, text: "Help me debug a Next.js middleware" },
  { icon: <ImageIcon size={16} />, text: "Generate a futuristic dashboard UI" },
  { icon: <Globe size={16} />, text: "Summarize the latest AI news" },
];

export default function NewChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          How can I help you <span className="text-blue-400">create</span> today?
        </h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Start a new conversation or pick a quick action to begin your workflow.
        </p>
      </motion.div>

      {/* Suggestion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
        {suggestions.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-start p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-left group"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="text-sm font-medium text-slate-300">{item.text}</p>
          </motion.button>
        ))}
      </div>

      {/* The Floating Input (Placeholder for now) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
         <motion.div 
           layout
           className="relative flex items-center bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl"
         >
           <input 
             type="text" 
             placeholder="Message Aura..." 
             className="flex-1 bg-transparent border-none focus:outline-none px-4 py-3 text-white placeholder-slate-500"
           />
           <button className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white transition-colors">
             <Zap size={18} fill="currentColor" />
           </button>
         </motion.div>
      </div>
    </div>
  );
}