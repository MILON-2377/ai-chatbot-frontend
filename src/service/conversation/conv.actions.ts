"use server";

import api from "@/src/lib/api";
import { IConv, IConvParams } from "./conv.types";



export const getConvsAction = async (params: IConvParams) => {

    return await api.get<IConv[]>("/conv", {
        params: params,
        cache: "no-store",
        next: {
            tags: ["conversation"]
        }
    });

}