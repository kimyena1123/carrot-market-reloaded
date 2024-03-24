"use server";

import { redirect } from "next/navigation";

    //Server Action
    //FormData는 FormData constructor 내부에서 오는 거다.
    export async function handleForm(prevState: any, data:FormData){
        console.log(prevState);

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("logged in!");

        redirect("/");
        
        return{
            errors: ['wrong pass', "password too short"],
        }
        // console.log("이메일>> ", data.get("email"));
        // console.log("비번 >> ", data.get("password"));
    }