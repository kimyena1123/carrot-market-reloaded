
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
        <input className="w-full rounded-full h-12 
                        bg-gray-200 pl-5 outline-none ring ring-transparent
                        focus:ring-orange-500
                        focus:ring-offset-2 transition-shadow
                        placeholder:drop-shadow"
               type="text" 
               placeholder="search here.." 
        />
        {/* 그라데이션 적용 */}
        <button className="bg-gradient-to-tr from-cyan-500 via-yellow-400 to-purple-400 
                         text-white py-2 rounded-full active:scale-90 
                          transition-transform font-medium focus:scale-90 outline-none
                          md:px-10"> {/* 반응형 적용 */}
          Search
        </button>
      </div>
    </main>
  );
}

// 폼을 만들 때 사용할 수 있는 몇가지 modifier
// Tailwind CSS에서 그라데이션 배경을 만드는 게 쉽다