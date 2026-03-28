/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";

interface RequestOptions {
    headers?: Record<string, string>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

export interface IClientResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export default class HttpClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        method: string,
        body?: any,
        options: RequestOptions & { params?: Record<string, any> } = {}
    ): Promise<IClientResponse<T>> {
        let cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

        if (options.params) {
            const searchParams = new URLSearchParams();
            Object.entries(options.params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value))
                }
            });

            const queryString = searchParams.toString();

            if (queryString) {
                cleanEndpoint += `?${queryString}`
            }
        }

        const fullUrl = `${this.baseUrl}${cleanEndpoint}`;


        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
            ...options.headers,

        };

        const config: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            cache: options.cache,
            next: options.next,
            credentials: "include",
        };

        try {
            const response = await fetch(fullUrl, config);

            const isJson = response.headers.get("content-type")?.includes("application/json");
            const data = isJson ? await response.json() : {};

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || `HTTP Error: ${response.status}`,
                };
            }

            return data;

        } catch (error) {
            console.error(`[API Error] ${method} ${endpoint}:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "An unexpected network error occurred"
            };
        }
    }

    // PUBLIC METHODS
    public get<T>(endpoint: string, options?: RequestOptions & { params?: Record<string, any> }) {
        return this.request<T>(endpoint, "GET", undefined, options);
    }

    public post<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, "POST", body, options);
    }

    public put<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, "PUT", body, options);
    }

    public patch<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, "PATCH", body, options);
    }

    public delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, "DELETE", undefined, options);
    }
}