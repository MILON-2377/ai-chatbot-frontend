import { motion } from "motion/react";

export default function AuraThinking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-3 px-2 py-4"
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute h-full w-full rounded-full bg-blue-500/20"
        />
        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      </div>
      <span className="text-xs font-medium tracking-wide text-slate-500 animate-pulse">
        Aura is processing...
      </span>
    </motion.div>
  );
}
