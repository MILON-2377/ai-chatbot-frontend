import { cookies } from "next/headers";
import TokenService from "./tokenService";
import { getEnv } from "../config/env.config";

export default class CookieService {
    
    public static setAuthCookies = async (accessToken: string, refreshToken: string) => {
        const cookieStore = await cookies();
        const isProd = process.env.NODE_ENV === "production";

        // 1. Calculate remaining time for BOTH tokens independently
        const accessRemaining = await TokenService.getTokenRemainingSeconds(
            accessToken, 
            getEnv.JWT_ACCESS_SECRET
        );
        
        const refreshRemaining = await TokenService.getTokenRemainingSeconds(
            refreshToken, 
            getEnv.JWT_REFRESH_SECRET
        );

        // 2. Set Access Token
        cookieStore.set(getEnv.ACCESS_TOKEN_NAME, accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: accessRemaining || 3600, 
        });

        // 3. Set Refresh Token
        cookieStore.set(getEnv.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: refreshRemaining || 604800, 
        });
    }
}