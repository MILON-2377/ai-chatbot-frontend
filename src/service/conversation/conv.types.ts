

export interface IConvParams {
    title?: string;
    page?: number;
    limit?: number;
}

export interface IConv {
    id: string;
    title?: string | null;
    userId: string;
}