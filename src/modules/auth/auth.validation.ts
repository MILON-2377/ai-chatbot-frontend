import * as z from "zod";


export const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name is too long"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters")
});


export const LoginSchema = z.object({
    email: z.string("Email is required")
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string("Password is required")
        .min(1, "Password is required")
});


export const VerifyEmailSchema = z.object({
    code: z
        .string()
        .min(1, "Required")
        .max(6, "Code must be exactly 6 digits")
        .regex(/^\d+$/, "Code must contain only numbers"),
});




export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;
