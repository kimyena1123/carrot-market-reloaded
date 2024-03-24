"use server";
import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
})

export async function createAccount(prevState:any, formData:FormData){
    //검증하려는(validate) 데이터 개체이다.
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    // console.log(data);
    const result = formSchema.safeParse(data);
    console.log(result); //{ success: false, error: [Getter] }

    if(!result.success){ //success가 true가 아니라면
        return result.error.flatten(); //이렇게 출력되는 결과가 state에 담기는 것임
    }
}