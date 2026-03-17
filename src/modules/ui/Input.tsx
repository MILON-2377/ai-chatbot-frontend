"use client";
import { motion, HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

// 1. Use HTMLMotionProps<"input"> instead of InputHTMLAttributes
interface InputProps extends HTMLMotionProps<"input"> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-400 ml-1">
            {label}
          </label>
        )}
        {/* 2. Motion.input now accepts all standard attributes via ...props */}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.005 }}
          className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 outline-none transition-all focus:bg-white/[0.08] focus:border-blue-500/50 ${
            error ? "border-red-500/50" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs text-red-400 ml-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;