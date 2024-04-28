import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent{
     //세션에 id가 없을 수도 있다. 쿠키에 id가 없을 수 있다.
     //로그인한 사용자만 쿠키에 id를 가지고 있다. 
    id?:number;
}

export default function getSession(){
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "delicious-carrot",
        password: process.env.COOKIE_PASSWORD! //쿠키를 암호화하기 위해 사용할거임
        //! : .env 안에 COOKIE_PASSWORD가 무조건 존재한다는 것을 알려주기 위한 것임
      });
}