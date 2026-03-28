import { NextRequest } from "next/server";


export function proxy (req: NextRequest) {};



export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};