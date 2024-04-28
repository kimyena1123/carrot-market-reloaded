"use server";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import "@/lib/db";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
// import { getIronSession } from "iron-session";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = (username: string) => !username.includes("미친");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

//1. username이 유일한지 체크 -> user가 존재한다면, 사용자에게 에러를 보낸다
const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  //console.log(user); //존재한다면 : { id: 3 }, 존재하지 않는다면 : null(null이어야 한다)

  // if(user){
  //   return false;
  // }else{
  //   return true;
  // }

  return !Boolean(user); //user가 null이라면 false를 return
};

//2. email이 유일한지 체크
//checkUniqueEmail에서 모든 것이 잘 될 경우 true를 return하고, 무언가 잘못되면 false를 return한다
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user) === false; //user를 찾으면 true, null이라면 false.
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!", //위에서 string이라고 명시. string 타입이 아니라면 해당 메시지 출력
        required_error: "Where is my username???", //해당 필드가 필수여야 한다는 의미. 해당 필드에 값을 안쓰면 메시지 출력
      })
      .trim() //유저가 시작과 끝에 공백을 넣었을 때, string 앞뒤에 붙은 공백을 제거해준다.
      .toLowerCase() //유저가 대문자로 입력해도 소문자로 바꿔준다.
      // .transform((username) => `🔥 ${username}`)
      .refine(checkUsername, "미친은 사용x"), //"미친"이 포함되어 있다면 메시지 출력
    // .refine(checkUniqueUsername, "해당 username은 이미 있는 이름입니다"),
    email: z
      .string()
      .email()
      .toLowerCase(),
      // .refine(checkUniqueEmail, "이미 존재하는 이메일입니다"),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      }
    });

    if(user){ //user가 찾아지면, user가 존재한다는 것이므로 에러를 발생시켜야 한다.
      //에러를 보여주기 위해 ctx를 쓸 거다. zod의 유효성 검사에서 에러를 추가하는 방법이다.
      ctx.addIssue({
        code: 'custom',
        message: "이미 사용중인 username 입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }

  })
  .superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      }
    });

    if(user){ //user가 찾아지면, user가 존재한다는 것이므로 에러를 발생시켜야 한다.
      //에러를 보여주기 위해 ctx를 쓸 거다. zod의 유효성 검사에서 에러를 추가하는 방법이다.
      ctx.addIssue({
        code: 'custom',
        message: "이미 사용중인 email 입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }

  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치해야 합니다",
    path: ["confirm_password"],
  });


// .superRefine(({ password, confirm_password }, ctx) => {
//   if (password !== confirm_password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "두 비밀번호가 일치해야 합니다!",
//       path: ["confirm_password"],
//     });
//   }
// });

export async function createAccount(prevState: any, formData: FormData) {
  // console.log(cookies());

  //검증하려는(validate) 데이터 개체
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  //parse가 아닌 safeParse를 쓰면 try catch문을 안써도 된다
  const result = await formSchema.safeParseAsync(data);
  //console.log(result); // //{ success: false, error: [Getter] }

  if (!result.success) {
    console.log("create account action.ts파일의 에러문구>> ", result.error.flatten());
    return result.error.flatten(); //이렇게 출력되는 결과가 state에 담기는 것임(useFormState)
  } else {
    //validation이 성공했다면

    //3. 비밀번호 해싱(Hashing)
    //await을 하는 이유: 데이터베이스에서 무언가를 찾거나 문자열을 해싱하는 과정은 시간이 걸린다. 그래서 await을 하는 것이다.
    const hashedPassword = await bcrypt.hash(result.data.password, 12); //해싱 알고리즘을 12번 실행
    // console.log(hashedPassword);

    //4. 마지막으로 사용자를 Prisma 사용해서 데이터베이스에 저장한다
    //비밀번호를 해싱한 후 데이터베이스에 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    console.log(user);

    //5. 사용자가 데이터베이스에 저장되면 사용자를 로그인시켜준다.(iron-session)
    //getIronSession은 쿠키 접근 허용이 필요하다.
    //우리는 나중에 쿠키를 읽거나 설정할 것이기 때문에, iron session에 쿠키를 줄거다
    //고맙게도, Nextjs의 최신버전(14ver)에서는 쿠키를 얻는게 엄청 쉽다. cookies라는 함수만 쓰면된다.
    //iron session을 얻으려면 현재 쿠키가 필요하다
    const session = await getSession();

    //가끔 어떤 쿠키에는 id가 없을 수도 있기 때문이다.
    //그런 경우 그 에러는 유저가 로그아웃 상태일 때 이 코드를 호출하면 발생할 거다.
    //이 코드가 이미 존재하는 쿠키를 주면 그건 id를 가지고 있다. 아니면 id가 없는 쿠키를 줄 수도 있다.
    //-> 왜냐하면 사용자가 로그인되어 있지 않을 수 있기 때문. 그러면 id가 없는 새로 만든 쿠키를 줄 거다.

    //사용자가 로그인 상태인지 알고 싶을 때는 언제든지 getSsession으로 세션에 id가 있는지 검사하면 된다.
    session.id = user.id;
    await session.save();

    //6. 사용자가 로그인하면 사용자를 /home으로 redirect 시킨다.
    redirect("/profile");

    // console.log(result.data);
  }
}
