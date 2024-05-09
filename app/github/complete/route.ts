import { notFound } from "next/navigation";
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
  const accessTokenData = await accessTokenResponse.json();

  if("error" in accessTokenData){
    return new Response(null, {
        status: 400,
        
    })
  }

  //   return Response.json({ accessTokenParams });
  return Response.json({ accessTokenData });
}
