import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest){
    // console.log(request.cookies.getAll());
    // console.log(cookies());
    //즉 여기서는 user가 로그인했는지 여부를 확인할 수 있다는 의미
    const session = await getSession();
    console.log(session);

    if(request.nextUrl.pathname === "/profile"){
        //절대경로를 사용해야 함. 싱대경로x
        return Response.redirect(new URL("/", request.url)); 
    }
}