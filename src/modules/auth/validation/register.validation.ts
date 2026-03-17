import * as z from "zod";


export const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name is too long"),
    email: z.string()
        .email("Invalid email address"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters")
});


export type RegisterInput = z.infer<typeof RegisterSchema>;