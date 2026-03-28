"use client";

import { motion } from "motion/react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Button from "./Button";
import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHome?: boolean;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the content. Please try again or head back home.",
  onRetry,
  showHome = true,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full p-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-red-500/20 p-10 rounded-3xl max-w-md shadow-2xl shadow-red-500/5"
      >
        {/* Animated Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
            <AlertCircle size={32} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button 
              variant="primary" 
              onClick={onRetry}
              className="px-6 flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Try Again
            </Button>
          )}
          
          {showHome && (
            <Link href="/">
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto px-6 flex items-center gap-2 border-white/5 bg-white/5 hover:bg-white/10"
              >
                <Home size={16} />
                Back to Home
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}