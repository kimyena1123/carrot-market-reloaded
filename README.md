This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Carrot-market-reloaded
```
npx create-next-app@latest
npm run dev
```

### daisyUI 설치
```
npm i -D daisyui@latest
```

### tailwind forms plugin 설치
https://tailwindcss.com/docs/plugins#official-plugins

https://github.com/tailwindlabs/tailwindcss-forms

```
npm i @tailwindcss/forms
```

plugin에 아래 코드 넣기
require('@tailwindcss/forms'),

## tailwind free icon library
```
npm install @heroicons/react
```

## zod install
https://zod.dev/?id=strings

```
npm i zod 
```

## validator.js library
수많은 validator를 모아놓은 라이브러리이다. 
zod와 같이 유용하게 사용할 수 있다.
validator처럼 type이 없는 라이브러리들은 다른 사람들이 라이브러리를 가지고 이것에 대한 type을 작성한 다음 우리가 설치할 수 있는 npm 패키지로 publish할 거다.
```
npm i validator
npm i --save-dev @types/validator
```

## Prisma install
```
npm i prisma
npx prisma init
```
만든 DB에 접속하기 위해 DB url을 .env 파일에 저장해야 한다고 알려준다. 
나중에 이 어플리케이션을 배포할 때 실제로 어딘가에 데이터베이스를 확보해야 한다. 그리고 Prisma에게 DB의 URL이 뭔지 알려줘야 한다. 
하지만 지금은ㅇ SQLite(로컬DB)를 사용할 것이다. 
.env 파일을 gitignore에 넣어야 한다. 나중에 DB url을 private으로 바꾸게 된다면 이걸 사람들에게 공개하는 것을 원하지 않을것이다.
(다른 사람들이 내 DB의 username이나 password 같은 것을 가질 수 있기에.)
```
npx prisma migrate dev
npx prisma studio
```
