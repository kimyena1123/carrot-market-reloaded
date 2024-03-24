

//여기서 커스텀할 수 있는 부분은 어디일까? input의 type과 placeholder, required이다.
//에러 또한 외부에서 커스텀 할 수 있어야 한다.
//이 컴포넌트는 다른 페이지에서도 쓰일 예정이기에, type의 종류가 달라질 수 있다!

interface FormInputProps{
        type:string;
        placeholder: string;
        required:boolean;
        //errors는 string 배열이 된다 => 여러 개의 error를 가질 수도 있기 때문.
        errors?:string[];
        name:string;
}

//{type}, {placeholder}, {required}, {errer} 값들은 모두 props에서 가져와야 한다.
//타입스크립트를 사용하고 있기에, FormInputProps라는 인터페이스를 만들 것이다.
export default function FormInput({type, placeholder, required, errors=[], name}: FormInputProps){
    return(
        <div className="flex flex-col gap-2">
                <input type={type} 
                        name={name}
                        placeholder={placeholder} 
                        className="bg-transparent rounded-md w-full h-10 focus:outline-none
                                ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500
                                border-none placeholder:text-neutral-400 transition"
                        required={required} 
                />
                {/* {errors.map((error, index)=>(
                        <span key={index}
                                className="text-red-500 font-medium">
                                {error}
                        </span>
                ))} */}
                </div>
    );
}