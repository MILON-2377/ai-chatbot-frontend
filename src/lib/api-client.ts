/* eslint-disable @typescript-eslint/no-explicit-any */

interface RequestOptions {
    headers?: Record<string, string>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

// Industry Standard: Use a consistent response shape
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
        options: RequestOptions = {}
    ): Promise<IClientResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...options.headers,

        };

        const config: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            cache: options.cache,
            next: options.next
        };

        try {
            const response = await fetch(url, config);

            // Handle empty responses (like 204 No Content)
            const isJson = response.headers.get("content-type")?.includes("application/json");
            const data = isJson ? await response.json() : {};

            if (!response.ok) {
                // FIXED: Don't await response.status, it's a property, not a promise
                return {
                    success: false,
                    error: data.message || `HTTP Error: ${response.status}`,
                };
            }

            // Return the response in your IClientResponse shape
            return {
                success: true,
                message: data.message,
                data: data.data || data // Handles nested or flat data structures
            };

        } catch (error) {
            console.error(`[API Error] ${method} ${endpoint}:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "An unexpected network error occurred"
            };
        }
    }

    // PUBLIC METHODS
    public get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, "GET", undefined, options);
    }

    public post<T>(endpoint: string, body: any, options?: RequestOptions) {
        // FIXED: Typo was "POS", changed to "POST"
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