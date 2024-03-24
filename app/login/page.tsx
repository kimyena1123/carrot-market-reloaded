import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login(){

    //Server Action
    //FormData는 FormData constructor 내부에서 오는 거다.
    async function handleForm(data:FormData){
        "use server";

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("logged in!");
        // console.log("이메일>> ", data.get("email"));
        // console.log("비번 >> ", data.get("password"));
    }

    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>

            {/* 여기서 action={handleForm}은 server action을 적용 
            여기 action이 pending 상태인지를 자동으로 알아낸다.로딩중인지, 작업이 끝났는지를 자동으로 알아낸다.
            중요) 이 hook은 form의 자식요소에서 사용해야 한다. form과 같은 곳에서 사용할 수 없다.*/}
            <form action={handleForm}
                className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <FormInput type="email" name="email" placeholder="Email" required errors={[]}/>
                <FormInput type="password" name="password" placeholder="Password" required errors={[]}/>
                
                <FormButton text="Log in"></FormButton>
            </form>

            <SocialLogin />
        </div>
    );
}