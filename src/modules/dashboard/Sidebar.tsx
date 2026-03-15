"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquarePlus, History, Settings, Home, Sparkles, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <MessageSquarePlus size={20} />, label: "New Chat", href: "/chat" },
  { icon: <History size={20} />, label: "History", href: "/history" },
  { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      layout
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      style={{ width: isExpanded ? 280 : 72 }}
      className="relative z-50 h-full flex flex-col border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-2xl"
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center px-5 overflow-hidden">
        <motion.div
          layout
          className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
        >
          <Sparkles size={18} className="text-white" />
        </motion.div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-bold text-white whitespace-nowrap tracking-tight"
            >
              AURA AI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                layout
                className={`relative group flex items-center h-11 rounded-xl px-3 transition-colors ${
                  isActive ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-full"
                  />
                )}

                <div className={`min-w-[24px] ${isActive ? "text-blue-400" : "group-hover:text-blue-400"} transition-colors`}>
                  {item.icon}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-3 border-t border-white/5">
        <motion.div
          layout
          className="flex items-center p-2 rounded-xl hover:bg-white/5 cursor-pointer group"
        >
          <div className="h-8 w-8 min-w-[32px] rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10" />
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 flex-1 overflow-hidden"
              >
                <p className="text-xs font-medium text-white truncate">Designer User</p>
                <p className="text-[10px] text-slate-500">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <LogOut size={14} className="text-slate-500 hover:text-red-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
}