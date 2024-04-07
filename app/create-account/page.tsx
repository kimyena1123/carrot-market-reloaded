"use client"; //useFormState를 쓰려면 이 페이지가 use client여야 한다

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount(){
    
    //action말고 dispatch라고도 함
    const [state, dispatch] = useFormState(createAccount, null);

    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>

            <form action={dispatch} className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <Input type="text" 
                            name="username" 
                            placeholder="Usernmae" 
                            required
                            errors={state?.fieldErrors.username} // 물음표를 쓰는 이유: 값이 string이거나 undefined 일 수 있기 때문.
                            minLength={3}
                            maxLength={10}
                />
                <Input type="email" 
                            name="email" 
                            placeholder="Email" 
                            required
                            errors={state?.fieldErrors.email} 
                />
                <Input type="password" 
                            name="password" 
                            placeholder="Password"  
                            required 
                            errors={state?.fieldErrors.password}
                            minLength={PASSWORD_MIN_LENGTH}
                />
                <Input type="password" 
                            name="confirm_password" 
                            placeholder="Confirm Password" 
                            required 
                            errors={state?.fieldErrors.confirm_password}
                            minLength={PASSWORD_MIN_LENGTH}
                />
                

                {/* 여기 컴포넌트에서 useFormStatus hook이 사용되고 있다 -> 이 hook은  form 태그와 같이 사용x. form의 "자식"에서만 사용 가능.*/}
                <Button text="Create account"></Button>
            </form>
            <SocialLogin />
        </div>
    );
}