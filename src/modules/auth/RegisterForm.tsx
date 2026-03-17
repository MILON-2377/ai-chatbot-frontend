"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  RegisterInput,
  RegisterSchema,
} from "./validation/register.validation";
import { registerUserAction } from "@/src/service/auth/register.action";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const response = await registerUserAction(data);

    if (!response.success) {
      console.log("failed to register user", response.error);
    }

    console.log("user register successfully", response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        isLoading={isSubmitting}
      >
        Create Account
      </Button>
    </form>
  );
}
