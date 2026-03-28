

export const MESSAGE_ROLES = {
    USER: "USER",
    ASSISTANT: "ASSISTANT",
    SYSTEM: "SYSTEM",
} as const;


export type MessageRole = keyof typeof MESSAGE_ROLES;


export interface ChatHistory {
    id: string;
    content: string;
    role: MessageRole;
    conversationId: string;
    createdAt: string;
}