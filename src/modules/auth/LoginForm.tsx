"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginInput, LoginSchema } from "./auth.validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAction } from "@/src/service/auth/auth.actions";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {

    const parsedInput = LoginSchema.safeParse(data);

    if(!parsedInput.success){
      const parsedErrorMsg = parsedInput.error.issues[0].message || "Invalid input"
      return toast.error(parsedErrorMsg);
    }

    const response = await loginAction(parsedInput.data);

    if (!response.success) {
      return toast.error(response.error || "Invalid credentials");
    }

    
    toast.success("Welcome back to Aura AI");
    router.push("/chat");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="space-y-1">
        <div className="flex justify-between items-center px-1">
           {/* Added a small link for password recovery */}
           <label className="text-sm font-medium text-slate-300">Password</label>
           <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
             Forgot?
           </button>
        </div>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        isLoading={isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
}