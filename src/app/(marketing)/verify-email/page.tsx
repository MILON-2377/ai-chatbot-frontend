import VerifyEmailContent from "@/src/modules/auth/VerifyEmailContent";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="bg-[#050505] min-h-screen" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}