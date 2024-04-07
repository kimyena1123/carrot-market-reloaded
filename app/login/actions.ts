"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string({required_error: "비밀번호란을 입력해주세요"}).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

    //Server Action
    //FormData는 FormData constructor 내부에서 오는 거다.
    export async function login(prevState: any, formData:FormData){
        // console.log(prevState);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        // redirect("/");

        const result = formSchema.safeParse(data);
        if(!result.success){
            return result.error.flatten();
        }else{
            console.log(result.data);
        }

        // console.log("이메일>> ", data.get("email"));
        // console.log("비번 >> ", data.get("password"));
    }