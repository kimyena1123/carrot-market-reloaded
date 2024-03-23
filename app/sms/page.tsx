import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin(){
    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Login</h1>
                <h2 className="text-xl">Verify your phone number.</h2>
            </div>

            <form className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <FormInput type="number" placeholder="Phone number" required errors={[]}/>

                {/* 인증할 때 사용할거임: 우리가 사용자에게 인증번호가 담긴 문자를 보내줄 것이다 */}
                <FormInput type="number" placeholder="Verification code" required errors={[]}/>
                
                {/* 사용자가 이 페이지에 처음 왔을 때는 첫번째 input 태그만 보이며 버튼은 send the message라고 할 것이다
                 그 후 사용자에게 메시지가 도착하면 1,2번째 input 태그가 다 보이며 버튼은 Verify라는 문구로 변하게 할 것임. */}
                <FormButton loading={false} text="Verify"></FormButton>
            </form>
        </div>
    );
}