/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEnv } from "@/src/config/env.config";
import TokenService from "@/src/lib/tokenService";
import { LoginInput } from "@/src/modules/auth/auth.validation";
import { LoginResponse } from "./auth.service.types";


export default class AuthService {

    public static login = async (payload: LoginInput, redirectPath?: string): Promise<LoginResponse> => {

        try {

            const response = await fetch(`${getEnv.BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const isJson = response.headers
                .get("content-type")
                ?.includes("application/json");

            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || `HTTP Error: ${response.status}`,
                };
            }


            const { accessToken, refreshToken, token } = data.data;

            console.log({data})

            await TokenService.setTokenInCookie(getEnv.ACCESS_TOKEN_NAME, accessToken);
            await TokenService.setTokenInCookie(getEnv.REFRESH_TOKEN_NAME, refreshToken);
            await TokenService.setTokenInCookie(getEnv.BETTER_AUTH_TOKEN, token);

            return {
                success: true,
                message: "User logged in successfully"
            }
        } catch (error: any) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "An unexpected network error occurred"
            };
        }
    }

}