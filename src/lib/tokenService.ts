import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import CookieService from "./cookieService";

export default class TokenService {

    private static verifyToken = (token: string, secret: string): JwtPayload | null => {
        try {
            return jwt.verify(token, secret) as JwtPayload;
        } catch (error) {
            return null;
        }
    }

    public static getTokens = async (): Promise<Record<string, string | null> | null> => {
        const cookieStore = await cookies();

        const accessKey = process.env.ACCESS_TOKEN_NAME || "accessToken";
        const refreshKey = process.env.REFRESH_TOKEN_NAME || "refreshToken";
        const authKey = process.env.BETTER_AUTH_TOKEN || "better-auth.session_token";

        const accessToken = cookieStore.get(accessKey);
        const refreshToken = cookieStore.get(refreshKey);
        const betterAuthToken = cookieStore.get(authKey);

        if (!accessToken?.value) return null;

        return {
            accessToken: accessToken.value,
            refreshToken: refreshToken?.value || null,
            betterAuthToken: betterAuthToken?.value || null,
        };
    };

    public static getTokenRemainingSeconds = async (token: string): Promise<number | null> => {
        try {
            if (!token) return null;

            const payload = jwt.decode(token) as JwtPayload;

            if (payload && payload.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                const remaining = payload.exp - currentTime;

                return remaining > 0 ? remaining : 0;
            }

            return null;
        } catch (error) {
            console.error("Failed to calculate token time:", error);
            return null;
        }
    }

    public static setTokenInCookie = async (
        name: string,
        token: string,
        fallbackMaxAgeInSeconds = 60 * 60 * 24
    ) => {
        let maxAgeInSeconds;

        if (name !== "better-auth.session_token") {
            maxAgeInSeconds = await this.getTokenRemainingSeconds(token);
        }

        await CookieService.setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds)

    };

    public static isTokenExpired = async (token: string): Promise<boolean> => {
        const remainingSeconds = await this.getTokenRemainingSeconds(token);
        return remainingSeconds === 0;
    }

}