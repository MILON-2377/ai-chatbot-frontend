"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import VerifyEmailForm from "@/src/modules/auth/VerifyEmailForm";
import { toast } from "sonner";
import { useState } from "react";
import { resendCodeAction } from "@/src/service/auth/auth.actions";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    if (!email) return toast.error("Email not found. Please register again.");

    setIsResending(true);
    const toastId = toast.loading("Resending verification code...");

    const response = await resendCodeAction({ email });

    setIsResending(false);

    if (response.success) {
      toast.success("A new code has been sent", { id: toastId });
    } else {
      toast.error(response.error || "Failed to resend code", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
      {/* Background Decor */}
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
        <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Check Your Email
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              We&apos;ve sent a code to{" "}
              <span className="text-blue-400 font-medium">{email}</span>. Please
              enter it below.
            </p>
          </div>

          <VerifyEmailForm email={email} />

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors disabled:text-slate-600"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
