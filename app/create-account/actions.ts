"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username:string) => !username.includes("미친");


const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!", //위에서 string이라고 명시. string 타입이 아니라면 해당 메시지 출력
        required_error: "Where is my username???", //해당 필드가 필수여야 한다는 의미. 해당 필드에 값을 안쓰면 메시지 출력
      })
      .min(3, "Username too short!!!")
      .max(10, "That is too looooong!")
      .trim() //유저가 시작과 끝에 공백을 넣었을 때, string 앞뒤에 붙은 공백을 제거해준다.
      .toLowerCase() //유저가 대문자로 입력해도 소문자로 바꿔준다. 
      .transform((username) => `🔥 ${username}`)
      .refine(checkUsername, "미친은 사용x"), //"미친"이 포함되어 있다면 메시지 출력
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(4)
      .regex(passwordRegex,"비밀번호는 소문자, 대문자, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다."),
    confirm_password: z.string().min(4),
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
    } else {
        console.log(result.data);
    }
}
