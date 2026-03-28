"use server";

import api from "@/src/lib/api";
import { ChatHistory } from "./history.types";


export const chatHistoryAction = async (convId: string) => {
    const res = await api.get<ChatHistory[]>(`/message/${convId}`);

    return res
}