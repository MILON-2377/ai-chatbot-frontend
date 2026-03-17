"use client";
import { motion, HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  isLoading, 
  className, 
  ...props 
}: ButtonProps) {
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    ghost: "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white",
    outline: "bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
  };

  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`relative flex items-center justify-center px-6 py-2.5 rounded-xl font-medium transition-all ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        children
      )}
    </motion.button>
  );
}