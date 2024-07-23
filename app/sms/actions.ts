"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import validator from "validator"; //처음에 에러 발생. 왜? validator가 typescript 라이브러리가 아니라서!
import { z } from "zod";
import "@/lib/db";
import db from "@/lib/db";
import { NEXT_CACHE_REVALIDATED_TAGS_HEADER } from "next/dist/lib/constants";

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

async function getToken(){ // token 생성하는 함수
    //랜덤한 숫자를 만든다.
    const token = crypto.randomInt(100000, 999999).toString();

    //위 랜덤한 숫자인 token이 이미 우리 데이터베이스에 존재하는지 아닌지 확인해야 한다. 고유한 토큰을 만들기 위해서.
    const exists = await db.sMSToken.findUnique({
        where: {
            token,
        },
        select: {
            id: true,
        }
    });

    //만약에 exitst값이 true라면(이미 토큰이 존재한다면), 또 다른 user가 이미 인증을 진행하고 있을 수도 있다는 것이다
    if(exists){ //만약 이미 존재한다면, 새 token이 필요하다 -> 함수 재실행
        return getToken();
    }else{
        return token;
    }

}

export async function smsLogIn(prevState: ActionState, formData: FormData){
    // console.log(typeof formData.get("token")); //string
    // console.log(typeof tokenSchema.parse(formData.get("token"))) //number

    const phone = formData.get("phone");
    const token = formData.get('token');

    //token이 false이면 검증 코드를 받는 input 태그를 숨긴다는 의미
    if(!prevState.token){  //prevState.token이 false이면 이 action을 처음 호출했다는 뜻이다. 즉, 유저가 전화번호만 입력했다는 의미

        // 1. user에게 token을 보내기 전 상태. user가 우리에게 전화번호를 보내주는 때. 우리는 zod를 이용해 그 전화번호를 검증하고 error가 있을 시 error를 return하고 없을 시 아래 2번으로 간다. 
        const result = phoneSchema.safeParse(phone);

        //잘못된 전화번호를 입력하면 validation이 실패하고, token false를 return 한다는 의미.
        if(!result.success){ 
            console.log(result.error.flatten());

            return{

                token:false, //token이 true가 아니라면 유저가 다음 단계로 넘어갈 수 없도록 설정
                error:result.error.flatten()
            }
        }else{ //2. 우리가 해야 할 일은, 먼저 이전 token을 삭제하기이다(user는 오직 하나의 token만 가지고 있어야 하기 때문) 그 다음엔 새 token을 생성한다. 그리고 그 토큰을 SMS을 통해 user에게 보낸다.
            
            // delete previous token
            await db.sMSToken.deleteMany({ //token의 user의 phone 값이 result.data와 동일한 경우에 삭제(result는 zod가 phone값을 parse할 때 전달하는 값이다.result는 error나 data를 가지고 있을 수 있는 object이다)
                where: {
                    user:{
                        phone: result.data
                    }
                }
            })

            //create token
            const token = await getToken(); //이 토큰생성함수는 이 action파일에서 분리되어야 한다
            
            //token 값을 생성했으니 데이터베이스에 저장
            //중요) 지금 우리는 user로부터 전화번호를 받고 있는데, 우리는 이 사용자가 이미 존재하는 유저인지 아닌지 앞에서 확인을 안하고 있다. 
            //      user가 이미 존재하는지를 사전에 확인하는 코드를 작성하는 대신에 prisma의 기능을 사용해서, 일단 token을 만든 다음에,
            //      이 Token을 이미 존재하는 user에 연결시키고, 만약 존재하는 user가 없다면 그냥 새 user를 만들어주는 거다! 이 모든 걸 한 구문에서 할 수 있다.
        
            await db.sMSToken.create({
                data: {
                    token,
                    user: { // 이 부분은 이 전화번호(result.data)를 가지고 있는 user가 항상 존재할거라고 가정하고 있다. 
                        //하지만 이 전화번호(result.data)를 가진 user가 존재하지 않는다면? 그래서 우린 connect대신 connectOrCreate를 쓸거다
                        connectOrCreate: { //connectOrCreate는 user를 찾으려 할 거다. phone이 user가 입력란에 적어 보낸 전화번호와 같은 user를 찾는다
                            where:{
                                phone: result.data
                            },
                            create: {//만약에 찾지 못하면 새 user를 생성한다
                                username: crypto.randomBytes(10).toString("hex"), //10byte의 16진수 형식 string
                                phone: result.data,
                            }
                        }
                    } 
                }
            })

            //send the token using twilio

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