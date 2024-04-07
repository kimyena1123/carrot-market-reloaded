"use server";

import validator from "validator"; //처음에 에러 발생. 왜? validator가 typescript 라이브러리가 아니라서!
import { z } from "zod";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

//tokenSchema는 number가 아니다.string으로 변환됨
//coerce.number: 유저가 입력한 string을 number로 변환하려고 시도함
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogIn(prevState: any, formData: FormData){
    console.log(typeof formData.get("token"));
    console.log(typeof tokenSchema.parse(formData.get("token")))
}