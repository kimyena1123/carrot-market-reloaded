"use server";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import "@/lib/db";
import db from "@/lib/db";
import { z } from "zod";

const checkUsername = (username:string) => !username.includes("미친");


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
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH),
      // .regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "두 비밀번호가 일치해야 합니다!",
        path: ["confirm_password"],
      });
    }
  });



export async function createAccount(prevState: any, formData: FormData) {

    //검증하려는(validate) 데이터 개체
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

    //parse가 아닌 safeParse를 쓰면 try catch문을 안써도 된다
    const result = formSchema.safeParse(data);
    //console.log(result); // //{ success: false, error: [Getter] }

    if (!result.success) {
        return result.error.flatten(); //이렇게 출력되는 결과가 state에 담기는 것임(useFormState)
    } else { //validation이 성공했다면
      //사용자가 제출한 email과 username이 데이터베이스에 있는지 없는지 확인해야 한다(unique 하니까 - 고유해야 하니까!)
      //다른 사람과 동일한 이메일이나 사용자명을 가질 수 없다 -> 이 두가지 검사가 false로 통과한다면 비밀번호를 해싱(hashing)해야 한다

      //1. username이 유일한지 체크 -> user가 존재한다면, 사용자에게 에러를 보낸다
      const user = await db.user.findUnique({
        where:{
          username: result.data.username
        },
        select: {
          id:true, //데이터베이스에게 user를 찾지만, id만 달라고 하는 것임 왜? user만 존재하는지만 알면 되기 때문.
        }
      });

      console.log(user); //존재한다면 : { id: 3 }, 존재하지 않는다면 : null

      if(user){
        //유저가 존재한다면 에러를 보내기
      }

      //2. email이 유일한지 체크
      const userEmail = await db.user.findUnique({
        where:{
          email: result.data.email,
        },
        select:{
          id: true,
        }
      });

      if(userEmail){
        //이미 존재하는 이메일이라면 에러 출력
      }

      //3. 비밀번호 해싱(Hashing)

      //4. 마지막으로 사용자를 Prisma 사용해서 데이터베이스에 저장한다

      //5. 사용자가 데이터베이스에 저장되면 사용자를 로그인시켜준다.

      //6. 사용자가 로그인하면 사용자를 /home으로 redirect 시킨다. 

        // console.log(result.data);
    }
}

