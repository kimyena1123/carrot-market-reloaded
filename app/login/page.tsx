import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login(){
    //Login 컴포넌트 안에서 onSubmit이라는 함수를 만들거다. 
    async function handleForm(){
        "use server";
        console.log("i run in the server baby!");
    }
    
    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>

            <form action={handleForm}
                className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <FormInput type="email" placeholder="Email" required errors={[]}/>
                <FormInput type="password" placeholder="Password" required errors={[]}/>
                
                <FormButton loading={false} text="Log in"></FormButton>
            </form>

            <SocialLogin />
        </div>
    );
}