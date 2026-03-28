"use client";

import { motion } from "motion/react";
import LoginForm from "@/src/modules/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Card - Matches Register UI */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Sign in to your Aura AI account
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              New to Aura AI?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
