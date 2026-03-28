"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VerifyEmailInput, VerifyEmailSchema } from "./auth.validation";
import { verifyEmailAction } from "@/src/service/auth/auth.actions";

interface Props {
  email: string | null;
}

export default function VerifyEmailForm({ email }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailInput) => {
    if (!email) {
      return toast.error("Email is missing. Please try registering again.");
    }

    const toastId = toast.loading("Verifying code...");

    try {
      const response = await verifyEmailAction({
        code: data.code,
        email: email,
      });

      if (!response.success) {

        console.error(response.error)

        return toast.error(response.error || "Invalid or expired code", {
          id: toastId,
        });
      }

      toast.success("Identity verified! Welcome to Aura AI.", { id: toastId });

      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("A network error occurred.", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Verification Code"
        placeholder="Enter 6-digit code"
        {...register("code")}
        error={errors.code?.message}
        inputMode="numeric"
        maxLength={6}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}
