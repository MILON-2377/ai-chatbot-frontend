"use server";

import api from "@/src/lib/api";
import { CreateChat } from "./chat.service.types";
import { revalidateTag } from "next/cache";


export const createChatAction = async (message: string) => {
    const res = await api.post<CreateChat>("/chat/create", { message });

    if (res.success && res.data) {
        revalidateTag("conversation", "default")
    };

    return res;

}

