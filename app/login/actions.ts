"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";


const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  // if(user){
  //     //user가 존재한다면 true를 return : user가 존재한다면 로그인할 수 있음
  //     return true;
  // }else{
  //     return false;
  // }

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다"),
  password: z.string({ required_error: "비밀번호란을 입력해주세요" }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

//Server Action
//FormData는 FormData constructor 내부에서 오는 거다.
export async function login(prevState: any, formData: FormData) {
  // console.log(prevState);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data); //safeParseAsync를 spa라고 할 수 있음
  if (!result.success) {
    // return result.error.flatten();
  } else {
    // 데이터 검사가 끝난 곳
    // console.log(result.data);
    //1.이메일로 사용자를 찾기(이메일로 유저찾기). 없다면 사용자가 존재하지 않는다는 에러를 보여준다
    // const user = await db.user.findUnique({
    //     where:{
    //         email: result.data.email
    //     },
    // });

    //2.비밀번호가 맞는지 확인하기 -> 사용자가 찾아졌을 때만(1번) 비밀번호의 해시값을 확인할 거다.
    //그리고 만약 비밀번호의 해시값이 일치한다면 사용자를 로그인시키기
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    //compare은 사용자가 보낸 비밀번호를 받는다. 그리고 받은 비밀번호 값을 데이터베이스의 해시값과 비교한다.
    //사용자가 보낸 비밀번호로 데이터베이스의 해시값을 만들 수 있는지를 확인한다. 확인해서 값이 true라면 비밀번호가 일치한다는 것임
    // compare() 함수의 첫번째 인자는 평문 비밀번호이다. 즉, 사용자가 입력한 텍스트 비밀번호를 의미한다.
    // 두번째 인자는 데이터베이스의 해시값이다.
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    ); //user가 password를 가지지 않는다면, 빈 문자와 비교한다는 의미. 만약 user의 password가 없다면, 빈 문자열 해시 값과 비교하라는 것임

    console.log('login action 페이지의 ok 값 >> : ',  ok);

    if(ok){ // ok의 값이 true라면 => 비밀번호가 일치한다면
      //로그인시키기 위해서는 세션을 가져와야 한다.
      const session = await getSession();
      session.id = user!.id;

      //매번 우리가 session을 변경할 때 cookie에 session.save()를 실행할 거다. 그렇지 않으면 아무것도 안하는거다.
      //이러한 변경사항은 실제로 cookie에 유지되지 않는다. 
      await session.save();

      //3. 로그인 성공하면 -> 사용자를 /profile로 redirect 하기
      redirect("/profile");
    }else{
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다. 다시 시도해주세요"],
          email: [],
        }
      }
    }
  }

  // console.log("이메일>> ", data.get("email"));
  // console.log("비번 >> ", data.get("password"));
}
