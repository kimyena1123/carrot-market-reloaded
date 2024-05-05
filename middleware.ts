import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest){
    const pathname = request.nextUrl.pathname;

    //예를 들어 유저가 메인화면으로 이동할 때 여기서 쿠키를 설정하고 싶다.
    if(pathname == "/"){
        //cookie를 설정하려면 먼저 내가 유저에게 실제로 제공할 response를 가져와야 한다. 
        //왜냐면 우리가 유저에게 제공한 response를 가져와서 우리가 원하는 cookie를 그 resonse에 넣기를 원하기 때문이다.여기서 유저에게 주기를 원하는 response를 가져와야 한다.
        const response = NextResponse.next(); //NextResponse.next(); >> 이건 유저에게 제공할 response를 준다.
        response.cookies.set("middleware-cookie","hello!"); //response.cookies.set()으로 cookie를 설정할 수 있다.

        return response;
    }
}