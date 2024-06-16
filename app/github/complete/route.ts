import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //url로부터 code 값을 가져온다
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  //   console.log(accessTokenParams) //accessTokenParams: "client_id=Ov23lijm0tgOKtTgih6n&client_secret=56ebd3aa8050278b7d8335c9730fe57ff0c01061&code=76ee96eb4dcaf3cf14fb"

  //일단 request를 await 하고, 다음엔 이 request가 JSON으로 변환되는 것을 다시 한번 기다린다
  // const accessTokenResponse = await (await fetch(accessTokenURL)).json();
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
const {error, access_token} = await accessTokenResponse.json();

  if(error){
    return new Response(null, {
        status: 400,
        
    })
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${access_token}`
    },
    cache: "no-cache",
  });

  //public 프로필로부터 user의 id 등 정보 가져오기
  const {id, avatar_url, login} = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id+""
    },
    select: {
      id: true,
    }
  });

  if(user){ // 이 user의 계정은 이미 있다는 의미
    //그럼 유저는 그저 로그인을 하려는 것이지 계정을 새로 만드는게 아니다.
    const session = await getSession();
    session.id = user.id;
    await session.save();
    
    return redirect("/profile");
  }

  //만약 user가 존재하지 않는다면, 새로운 user를 만들고 싶다. 
  const newuser = await db.user.create({
     data: {
      username: login,
      github_id: id+"", // db에 github_id는 문자열인데 int형으로 줘서 에러 발생.
      avatar: avatar_url,
     },
     select: {
      id: true
     }
  });

  const session = await getSession();
  session.id = newuser.id;
  await session.save();

  return redirect("/profile");

}
