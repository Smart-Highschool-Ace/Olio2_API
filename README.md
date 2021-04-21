# Olio API Server

`Olio는 광주 소프트웨어 마이스터고등학교의 웹 포트폴리오 서비스입니다! 기존의 종이로 인쇄되던 포트폴리오 모음집을 대체하기 위해 제작되었습니다.`

## 👇 Notion Page에서 Olio의 개발 과정을 확인해 보세요!

## 📗 [Olio Notion Page](https://www.notion.so/Olio_Dev-976dcf18b82146878c192994a35600f5)

## 기술 스택

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Koa.js](https://koajs.com/)
- [Prisma](https://www.prisma.io/)
- [Apollo Server](https://www.apollographql.com/)
- [Nexus.js](https://nexusjs.org/)

## 실행 방법

1. Repository를 clone 합니다.

```sh
git clone https://github.com/Smart-Highschool-Ace/Olio2_API.git
```

2. Package manager를 통해 패키지를 설치합니다.

```sh
yarn
```

3. 아래의 명령어를 통하여 서버를 실행 시킬 수 있습니다.

```sh
yarn start # 서버를 실행 시킵니다.
yarn dev # 서버를 개발 모드(저장 시 자동으로 재시작)로 실행 시킵니다.
yarn migrate:dev # Prisma Schema의 변동 사항을 DB로 migrate합니다.
yarn migrate:reset # Migration 과정 중 오류가 났을때, DB를 초기화 시켜줍니다.
yarn prisma generate # prisma.schema 파일의 내용으로 Prisma Client를 생성합니다 (서버 실행전 1회 필수!, migrate:dev 명령어에 포함되어있습니다.)
```

4. GraphQL Client를 통해 요청을 보냅니다.

```GraphQL
mutation createUser($user:UserCreateInput){
	createUser(user : $user){
        school
    }
}

------------------------

Variables
{
	"user" : {
		"email" : String
		"password" : String
		"school" : String # Gwangju: 광주, Daejeon: 대덕, Daegu: 대구, Busan: 부산
		"name" : String
		"entrance_year" : Int # 2019, 2020, 2021
		"profile_image" : String
		"introduction" : String
	}
}
```

## 환경 변수 설정

### /.env

```sh
PORT=4000
JWT_SECRET_KEY="YOUR_SECRET_KEY"
SALT="0LI0-3"
NODEMAILER_USER={회원가입 인증 이메일}
NODEMAILER_PASS={이메일 비밀번호}
BUCKET_NAME={AWS S3 버킷 이름}
ACCESS_KEY_ID={엑세스 키 아이디}
SECRET_ACCESS_KEY={시크릿 엑세스 키}
```

### /prisma/.env

```sh
DATABASE_URL="mysql://{id}:{password}@{DB_HOST}:{DB_PORT}/{database_name}"
```
