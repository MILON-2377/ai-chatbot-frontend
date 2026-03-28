"use client";

import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IConv } from "@/src/service/conversation/conv.types";

export default function ConvHistory({
  conversations,
  isExpanded,
}: {
  conversations: IConv[];
  isExpanded: boolean;
}) {
  const params = useParams();
  const activeId = params?.id;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 custom-scrollbar space-y-1">
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3"
          >
            Recent History
          </motion.p>
        )}
      </AnimatePresence>

      {conversations.map((conv) => {
        const isActive = activeId === conv.id;
        return (
          <Link key={conv.id} href={`/chat/${conv.id}`}>
            <motion.div
              layout
              className={`group relative flex items-center h-10 rounded-xl px-3 transition-all ${
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:bg-white/3 hover:text-slate-200"
              }`}
            >
              <MessageSquare size={18} className="min-w-4.5" />

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="ml-3 flex-1 overflow-hidden flex items-center justify-between"
                  >
                    <span className="text-sm truncate font-medium">
                      {conv.title}
                    </span>

                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-opacity">
                      <MoreVertical size={14} className="text-slate-500" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle active indicator to match your main nav */}
              {isActive && isExpanded && (
                <motion.div
                  layoutId="active-history-pill"
                  className="absolute left-0 w-1 h-4 bg-blue-500 rounded-r-full"
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
