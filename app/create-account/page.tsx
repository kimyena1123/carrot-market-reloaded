"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount(){
    
    const [state, dispatch] = useFormState(createAccount, null);

    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>

            <form action={dispatch} className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <FormInput type="text" 
                            name="username" 
                            placeholder="Usernmae" 
                            required
                            errors={state?.fieldErrors.username} 
                />
                <FormInput type="email" 
                            name="email" 
                            placeholder="Email" 
                            required
                            errors={state?.fieldErrors.email} 
                />
                <FormInput type="password" 
                            name="password" 
                            placeholder="Password"  
                            required 
                            errors={state?.fieldErrors.password}
                />
                <FormInput type="password" 
                            name="confirm_password" 
                            placeholder="Confirm Password" 
                            required 
                            errors={state?.fieldErrors.confirm_password}
                />
                

                {/* 여기 컴포넌트에서 useFormStatus hook이 사용되고 있다 -> 이 hook은  form 태그와 같이 사용x. form의 "자식"에서만 사용 가능.*/}
                <FormButton text="Create account"></FormButton>
            </form>
            <SocialLogin />
        </div>
    );
}