interface FormButtonProps{
    loading: boolean;
    text:string;
}


//버튼은 로딩중일 때 비활성화 시켜줘야 할 수도 있기 때문에 disabled 설정
//text에도 loading이 필요하다
export default function FormButton({loading, text}:FormButtonProps){
    return(
        <button disabled={loading} 
                className="primary-btn h-10 
                            disabled:bg-neutral-400 
                            disabled:text-neutral-300
                            disabled:cursor-not-allowed">
            {loading? "Loading..": text}
        </button>
    );
}