"use server";

import { RegisterInput } from "@/src/modules/auth/validation/register.validation";
import { registerUser } from "./register.service";


export const registerUserAction = async (payload: RegisterInput) => {
    return await registerUser(payload);
}