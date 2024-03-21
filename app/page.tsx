
export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2">
        {/* input과 button의 컨테이너 역할을 하는 카드 컴포넌트를 만들기 */}
        <input className="w-full rounded-full h-12 
                        bg-gray-200 pl-5 outline-none ring 
                        ring-orange-500 ring-offset-2 
                        ring-offset-blue-600" 
               type="text" 
               placeholder="search here.." 
        />
        <button className="bg-black text-white py-2 rounded-full active:scale-90 
                              transition-transform font-medium focus:scale-90 outline-none">
          Search
        </button>
      </div>
    </main>
  );
}
