
export default function Home() {
  return (
    <main className="bg-gray-100 h-screen 
          flex items-center justify-center p-5 
          sm:bg-red-100
          md:bg-green-100
          lg:bg-cyan-100
          xl:bg-orange-100
          2xl:bg-purple-100">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 md:flex-row">
        {/* input과 button의 컨테이너 역할을 하는 카드 컴포넌트를 만들기 */}
        <input className="w-full rounded-full h-10 bg-gray-200 pl-5
                          outline-none ring ring-transparent focus:ring-green-500
                          focus:ring-offset-2 transition-shadow
                          placeholder:drop-shadow
                          invalid:focus:ring-red-700
                          peer"
               type="email" 
               placeholder="Email address"
               required 
        />

        <span className="text-red-500 font-medium hidden peer-invalid:block pl-3">Email is required</span>

        {/* 그라데이션 적용 */}
        <button className="bg-black
                         text-white py-2 rounded-full active:scale-90 
                          transition-transform font-medium focus:scale-90 outline-none
                          md:px-10
                          peer-invalid:bg-red-100"> {/* peer-required:bg-green-500*/}
          Log in
        </button>
      </div>
    </main>
  );
}

// 폼을 만들 때 사용할 수 있는 몇가지 modifier
// peer