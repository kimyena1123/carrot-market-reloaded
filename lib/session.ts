import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  //세션에 id가 없을 수도 있다. 쿠키에 id가 없을 수 있다.
  //로그인한 사용자만 쿠키에 id를 가지고 있다.
  id?: number;
}

//이 getSession() 함수가 브라우저의 cookies를 받고 있다.
export default function getSession() {
  console.log('session페이지에서 cookies() 확인 >> ', cookies());
  //새로고침하면 아래 내용을 볼 수 있다. 
  // session페이지에서 cookies() 확인 >>  f {
  //   _parsed: Map(1) {
  //     'delicious-carrot' => {
  //       name: 'delicious-carrot',
  //       value: 'Fe26.2*1*f3bdd2c7e2901d53f94328fdf9fde8a3414f30651b396036658791bf4345237b*en2JnF-68-DajiPBqcWUkA*6nQ2KfvttoG8ldxHk_pe-g*1715782994615*62c71f296131a7df21b611c6e44880c3a2960a55149c83452ed0b177eebe82de*LKayC0QRvCEpPiDsgJbWvNS-OJ8jhzstsYdboOMrZfU~2'
  //     }
  //   },
  //   _headers: Headers {}
  // }
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!, //쿠키를 암호화하기 위해 사용할거임
    //! : .env 안에 COOKIE_PASSWORD가 무조건 존재한다는 것을 알려주기 위한 것임
  });
}
