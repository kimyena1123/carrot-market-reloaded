import { NextRequest } from "next/server";

//NestJS는 NextRequest 타입의 request 객체를 제공하고 있다. 
export async function GET(request:NextRequest){
    console.log(request);

    return Response.json({
        ok: true,
    });
}

export async function POST(request:NextRequest){
    //request의 body를 돌려주는 json 함수를 사용
    //json은 Promise를 return한다. 
    //그래서 josn에 awiat을 붙여서 data를 받아온다.
    const data = await request.json();
    console.log("route.ts data >> ", data); //{ username: 'nico', password: '1234' }
    
    return Response.json(data);
}