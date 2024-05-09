import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

//여기서 인증되지 않은 user가 갈 수 있는 URL을 저장할 거다.
// array가 아닌 object로 저장하고 있다. 왜냐하면 만약 object 내에서 뭔가를 포함하고 있는지 검색하는 게, array 내에서 무언가를 포함하고 있나 검색하는 것보다 약간 더 빠르기 때문이다
//여기서 publicOnlyUrls에 특정 URL이 포함되어 있는지 검색하는 건 매우 쉽다
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname]; //user가 갈 예정인 url을 넣기

  //아래 if문을 사용하기 전 : 유저가 로그인 안한 상태로 Profile을 가면 notFound() 함수로 인해 404 페이지로 갔음
  //아래 if문을 사용한 후 : 서버로 가기 전 미들웨어에서 제어 -> 유저가 로그인 하기 전 profile 페이지로 가면 아래 코드로 인해 "/"로 리다이렉트
  //서버로 가기 전에 미리 제어가능. 즉, profile 페이지의 getUser 함수를 실행하기 전에 제어할 수 있다는 말임.
  if (!session.id) {
    //만약 session이 id가 없다면? => 유저는 로그아웃 상태임
    //유저가 로그인 상태가 아니라면 pulicOnlyUrls로 이동하지 못한다. 유저를 reidirect 해야 한다.
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    //로그인한 상태라면         hpublicOnlyUrls에 있는 경로로 갈 수 없어야 한다.
    if (exists) {
      //유저가 publicOnlyUrls로 가려고 한다면, 해당 경로로 갈 수 없다는 사실을 알려줘야 함
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  //config object에는 matcher array가 있다. 말 그대로 mdidleware가 실행되어야 하는 페이지를 지정할 수 있다.
  //marcher에서 url을 작성하는 거 외에, 패턴을 쓸 수도 있고 정규방정식을 쓸 수도 있다. ex) user로 시작하는 모든 단일 url에서 실행하도록 하고 싶다
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
