import FormInput from "@/components/form-input";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreateAccount(){
    return(
        <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>

            <form className="flex flex-col gap-3">
                {/* 페이지에 따라 input 태그가 많아질 수도, 적어질수도 있다. 직접 입력하기보다는 컴포넌트로 빼두는게 효율적임! */}
                <FormInput type="text" placeholder="Usernmae" required errors={[]}/>
                <FormInput type="email" placeholder="Email" required errors={[]}/>
                <FormInput type="password" placeholder="Password" required errors={[]}/>
                <FormInput type="password" placeholder="Confirm Password" required errors={[]}/>
                
                <button className="primary-btn h-10">
                    Create account
                </button>
            </form>

            <div className="w-full h-px bg-neutral-500" />

            <div>
                <Link href="/sms"
                    className="primary-btn flex h-10 items-center justify-center gap-3">
                    <span>
                        <ChatBubbleOvalLeftEllipsisIcon 
                        className="h-6 w-6"/>
                        </span>
                    <span>Sign up wigh SMS</span>
                </Link>
            </div>
        </div>
    );
}