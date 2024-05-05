import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    if(request.nextUrl.pathname === "/profile"){
        return Response.json({
            error: "you are not allowed here!",
        });
    }
}