// 우리가 useFormStatus hook을 사용하기 위해서는 이걸 client component로 바꿔야 한다.
// 당연하다. client component는 interactive 하다.  그리고 우린 이 버튼을 interactive하게 만들었다. 

// 이 버튼은 form이 pending될 때, 즉 action이 pending 될 때 비활성화될 테니까, 그러니까 이건 client component가 되어야 한다.
"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps{
    //이제 이 버튼에서 loading은 필요없다. 왜냐하면 이제는 hook이 form의 로딩상태를 알려줄 것이기 때문이다.
    // loading: boolean;
    text:string;
}


//버튼은 로딩중일 때 비활성화 시켜줘야 할 수도 있기 때문에 disabled 설정
//text에도 loading이 필요하다
export default function FormButton({text}:FormButtonProps){

    //useFormStatus는 객체를 반환한다. 이 객체는 여러 속성을 가지고 있다(data, method, pending...). 그리고 action이 어떤 action이었는지를 알려준다. 
    //pending : true or false
    //버튼은 form이 pending 상태(true)라면 비활성화될 거다.(pending 상태인지를 알려준다 -> function이 끝난 여부를 알려준다.)
    //하지만 문제가 있다(이 hook은 action을 실행하는 form과 같은 곳에서 사용할 수 없다. form의 "자식"에서만 사용할 수 있다)
    //이 hook은 자동으로 부모 form을 찾을 거다.=> 여기서 부모 form은? => 로그인 페이지의 form action={handleForm}부분임.
    const {pending} = useFormStatus();

    return(
        <button disabled={pending} 
                className="primary-btn h-10 
                            disabled:bg-neutral-400 
                            disabled:text-neutral-300
                            disabled:cursor-not-allowed">
            {pending? "Loading..": text}
            {/* pending == true라면 '로딩중..'이라는 텍스트를 보여준다. */}
        </button>
    );
}