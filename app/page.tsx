
export default function Home() {
  return (
    <main className="bg-gray-100 h-screen 
          flex items-center justify-center p-5 
          sm:bg-red-100
          md:bg-green-100
          lg:bg-cyan-100
          xl:bg-orange-100
          2xl:bg-purple-100">
      <div className="bg-white shadow-lg p-5 
                      rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 
                      md:flex-row
                      *:outline-none
                      ring ring-transparent transition-shadow
                      has-[:invalid]:ring-red-100
                     ">{/* *:md:text-pink-900 */}
        {/* input과 button의 컨테이너 역할을 하는 카드 컴포넌트를 만들기 */}
        <input className="w-full rounded-full h-10 bg-gray-200 pl-5
                          ring ring-transparent focus:ring-green-500
                          focus:ring-offset-2 transition-shadow
                          placeholder:drop-shadow
                          invalid:focus:ring-red-700
                          peer"
               type="text" 
               placeholder="Email address"
               required 
        />

        <span className="text-red-500 font-medium hidden peer-invalid:block pl-3">Email is required</span>

        {/* 그라데이션 적용 */}
        <button className="bg-black
                         text-white py-2 rounded-full active:scale-90 
                          transition-transform font-medium focus:scale-90
                          md:px-10
                         "> {/* peer-invalid:bg-red-100" , peer-required:bg-green-500*/}
          Log in
        </button>
      </div>
    </main>
  );
}


// 요소의 컨테이너에 적용할 수 있는 것들
// 형제 : peer
// 자식 : *
// has : 해당 컨테이너에서 특정 조건을 만족하는 자식을 확인할 수 있다.

//input 태그의 invalid : input 태그아 invalid라면 링부분을 빨간색으로!(peer는 형제로 지정)
//button 태그의 peer : 형제인 input 태그가 invalid라면 display: block으로 해당 글씨가 보이게 해줘
//div 태그의 has-[:invalid]: 자식태그 중에서 invalid 상태라면 바탕색을 red-100으로 해줘.
//has-[:invalid]:ring-red-100 : invalid인 자식이 있다면 ring-red-100을 적용하고 