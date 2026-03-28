"use server";

import api from "@/src/lib/api";
import { LoginInput, RegisterInput } from "@/src/modules/auth/auth.validation";
import { ResendVerifyEmailOtp, VerifyEmailPayload } from "./auth.service.types";
import AuthService from "./auth.service";



export const registerAction = async (payload: RegisterInput) => {
    return api.post("/auth/register", payload);
}

export const loginAction = async (payload: LoginInput) => {
    return await AuthService.login(payload);
}

export const resendCodeAction = async (payload: ResendVerifyEmailOtp) => {
    return await api.post("/auth/resend-otp", payload);
}


export const verifyEmailAction = async (payload: VerifyEmailPayload) => {
    return await api.post("/auth/verify-email", payload);
}

