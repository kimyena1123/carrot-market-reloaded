
export default function Home() {
    return(
        <main className="bg-gray-100
                            sm:bg-red-100
                            md:bg-green-100
                            lg:bg-cyan-100
                            xl:bg-orange-100
                            2xl:bg-purple-100
                            h-screen flex items-center justify-center p-5">
            <div className="bg-white shadow-lg p-5
            rounded-3xl w-full max-w-screen-sm flex flex-col gap-4">
                <button className="w-full h-10 bg-black text-white 
                                rounded-borderName mt-tomato">
                    Submit
                </button>
            </div>
        </main>
    );
  }
//group modifier는 아버지의 state에 따라서 자식을 변경하는 것을 도와준다. 
//has와 반대. has 예시: 자식에 invalid가 있을 때, input 태그의 continaer에 스타일을 줬었다.
//group 예시: 상위부모에 group 클래스가 있으면, 자식태그에 스타일링을 주는 것