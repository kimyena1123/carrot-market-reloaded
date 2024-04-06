"use server";
import { z } from "zod";

const passwordRegex = new RegExp( 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);


const checkUsername = (username:string) => !username.includes("potato");

const checkPassword = ({password, confirm_password}:{password:string, confirm_password:string}) =>
                    password === confirm_password

const formSchema = z.object({
    username: z.string({
        invalid_type_error: "Username must be a string!", 
        required_error: "Where is my username??"
    }).min(3, "username이 너무 짧습니다")
        .max(10, "username이 너무 깁니다!")
        .toLowerCase()
        .trim()
        .transform(username => `🔥 ${username} 🔥`)
        .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(10),
    // .regex(passwordRegex, "A password must have lowercase, UPPERCASE, a number and special characters."),
    confirm_password: z.string().min(10),
}).refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"]
});

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
        // console.log(result.error.flatten());
        return result.error.flatten(); //이렇게 출력되는 결과가 state에 담기는 것임
    }else{
        console.log(result.data);
    }
}