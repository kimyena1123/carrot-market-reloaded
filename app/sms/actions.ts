"use server";

import { redirect } from "next/navigation";
import validator from "validator"; //처음에 에러 발생. 왜? validator가 typescript 라이브러리가 아니라서!
import { z } from "zod";

//refine(): 첫번째 인자 - 내가 refine하려는 data이다.  
// const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
// const phoneSchema = z.string().trim().refine(phone => validator.isMobilePhone(phone));
const phoneSchema = z.string().trim().refine(phone => validator.isMobilePhone(phone, "ko-KR"),"Wrong phone format");

//tokenSchema는 number가 아니다.string으로 변환됨
//coerce.number: 유저가 입력한 string을 number로 변환하려고 시도함
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
    token:boolean
}

export async function smsLogIn(prevState: ActionState, formData: FormData){
    // console.log(typeof formData.get("token")); //string
    // console.log(typeof tokenSchema.parse(formData.get("token"))) //number

    const phone = formData.get("phone");
    const token = formData.get('token');

    //token이 false이면 검증 코드를 받는 input 태그를 숨긴다는 의미
    if(!prevState.token){ //prevState.token이 false이면 이 action을 처음 호출했다는 뜻이다. 즉, 유저가 전화번호만 입력했다는 의미
        const result = phoneSchema.safeParse(phone);

        //잘못된 전화번호를 입력하면 validation이 실패하고, token false를 return 한다는 의미.
        if(!result.success){
            console.log(result.error.flatten());

            return{
                token:false, //token이 true가 아니라면 유저가 다음 단계로 넘어갈 수 없도록 설정
                error:result.error.flatten()
            }
        }else{
            return{
                token:true,
            }
        }
    }else{ //token이 true일 때
        const result = tokenSchema.safeParse(token);

        if(!result.success){
            return{
                token:true,
                error:result.error.flatten()

            }
        }else{
            //sms 로그인 성공 -> redirect
            redirect("/");
        }
    }
}