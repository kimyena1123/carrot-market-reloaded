//route 파일로 URL의 특정 HTTP method handler를 만들 수 있다는 것을 기억해야 한다.
//이전에 했던 것처럼, GET과 POST도 처리할 수 있고, 여러 HTTP method를 처리할 수 있다. 기본적으로 API route를 만드는 것과 같은 거다.
//우리는 react.js나 HTML을 리턴하고 싶지 않을 때 route.ts를 사용했다.

import { NextResponse } from "next/server";

//이 GET 함수는 /github/start URL로 GET request를 보낼 때 동작할거다.
export function GET() {
  // console.log("get");
  const baseURL = "https://github.com/login/oauth/authorize?";

  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user, user:email",
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params).toString();
//   console.log(formattedParams.toString());

const finalUrl = `${baseURL}${formattedParams}`;

return Response.redirect(finalUrl);
}
