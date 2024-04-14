import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

//create : 행 생성
//findMany : 많ㅅ은 사용자들로 이루어진 배열을 반환한다.
// async function test(){
//     // const user = await db.user.create({
//     //     data:{
//     //         username: "testusername",
//     //     },
//     // });

//     const users = await db.user.findMany({
//         where: {
//             username:{
//                 contains: "est"
//             }
//         }
//     });
//     console.log(users);
// }

// async function test() {
//   const token = await db.sMSToken.create({
//     data: {
//       token: "1212112",
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
//   console.log(token);
// }

async function test(){
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1
    },
    include: {
      user: true //user(테이블) 정보도 같이 출력해준다. 
    }
  });
  console.log(token);
}
//include 객체는 관계를 포함하는데 사용된다. -> 사실상 join과 같은 느낌s
  //만약 SMSToken이 사용자를 가지고 있다면, SMSToken을 검색할 때 사용자를 포함시킬 수 있다. 


test();

export default db;
