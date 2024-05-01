import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  //여기서 session을 가져온다.
  const session = await getSession();

  //session은 id를 가질 수도, 가지지 않을 수도 있다.
  if (session.id) {
    // 로그인을 했다

    //user.id와 session 안의 id를 확인하고, 일치하는 User를 찾을 거다.
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if(user){ //session이 있지만 user를 찾지 못하거나 session이 없는 경우에 notFound()함수를 trigger 할 거다
      return user;
    }
  }

  //예를 들어, 사용자가 로그인을 하면 localhost:3000/profile로 이동해서 해당 유저의 정보를 보여준다. 
  //유저가 해당 주소를 복붙한 다음 로그아웃 하고 나서 복붙한 주소(localhost:3000/profile)로 들어갔을 때
  //해당 페이지로 이동하는 것을 막기 위해 notFound()함수를 사용한다
  //notFount는 언제 실행할까? => seesion이 ID가 없을 때 뿐이다!
  //session이 ID가 있고, user를 찾으려 하지만 찾ㅇ르 수 없으면 notFound가 실행된다
  //만약 user를 찾고 return 된다면 아래의 notFount는 실행될 일이 없다.
  notFound(); // 404 status만을 전송한다.
}

export default async function Profile() {
  //우선 user에 대한 데이터를 얻는다.
  const user = await getUser();

  //inline server action
  const logOut = async () => {
    "use server";

    //여기서 session을 없앤다. 즉 cookie를 없애는 것임. 그러므로 user는 login 된 상태가 아니다.
    const session = await getSession();
    await session.destroy(); //cookie는 사라지고
    redirect("/"); //user를 home으로 redirect.
  }

  return (
    <div>
      <h1>welcome {user?.username}!</h1>
       
      {/* logout 버튼을 클릭할 때마다 form을 submit 한다 */}
      {/* formm의 action은 logout server 동작이라고 알려주는 거다. */}
      <form action={logOut}>
        <button>Log out</button>
        {/* <input type="submit" value="log out" /> */}

      </form>
    </div>
  );
}

//사람들은 action을 트리거하는 버튼이 있으면 항상 onClick을 사용한다.
//그래서 client component를 사용해야 한다.
// 그 대신에 button을 form 안에 넣고 만약 form 안에 다른 button이 없다면, 이 버튼은 form을 제출할거다
//button이 아니라 input 태그를 사용해도 된다. 결과는 같다. 둘 다 똑같이 form을 제출하긴 하지만 당연히 button을 만드는게 더 좋은 방법이다.
