


export interface ResendVerifyEmailOtp {
    email: string;
}


export interface VerifyEmailPayload {
    code: string;
    email: string;
}


export interface LoginResponse {
    success: boolean;
    message?: string;
    error?: string;
}