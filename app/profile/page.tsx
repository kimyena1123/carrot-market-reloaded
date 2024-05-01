import db from "@/lib/db";
import getSession from "@/lib/session";

async function getUser(){
    //여기서 session을 가져온다.
    const session = await getSession();

    //session은 id를 가질 수도, 가지지 않을 수도 있다.
    if(session.id){ // 로그인을 했다

        //user.id와 session 안의 id를 확인하고, 일치하는 User를 찾을 거다. 
        const user = await db.user.findUnique({
            where:{
                id: session.id
            },
        });

        return user;
    }
}

export default async function Profile(){
    //우선 user에 대한 데이터를 얻는다. 
    const user = await getUser();
    return <h1>welcome {user?.username}!</h1>;
}