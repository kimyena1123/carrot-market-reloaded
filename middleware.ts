import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    if(request.nextUrl.pathname === "/profile"){
        //절대경로를 사용해야 함. 싱대경로x
        return Response.redirect(new URL("/", request.url)); 
    }
}