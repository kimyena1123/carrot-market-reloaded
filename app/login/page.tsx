"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login(){

    //useFormState 함수
    //첫번째 아이템: action이 반환하는 값(즉, action이 실행해서 나온 결과값)
    //두번째 아이템: action을 실행하는 트리거
    //즉, 트리거를 통해 action을 실행하면 hook은 action의 결과를 state에 담아서 돌려준다. 
    const [state, dispatch] = useFormState(login, null);

    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>

            {/* 여기서 action={login}은 server action을 적용 
            여기 action이 pending 상태인지를 자동으로 알아낸다.로딩중인지, 작업이 끝났는지를 자동으로 알아낸다.
            중요) 이 hook은 form의 자식요소에서 사용해야 한다. form과 같은 곳에서 사용할 수 없다.*/}
            <form action={dispatch} className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
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
                        minLength={PASSWORD_MIN_LENGTH} 
                        errors={state?.fieldErrors.password}
                />
                
                <Button text="Log in"></Button>
            </form>

            <SocialLogin />
        </div>
    );
}