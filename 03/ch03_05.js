// .env 파일을 프로그램상에 로드합니다.
require("dotenv").config();

console.log(`서버 포트: ${process.env.PORT}`);

// 문제 1

console.log(`db name: ${process.env.DB_NAME}`);
console.log(`db user: ${process.env.DB_USER}`);
console.log(`password : ${process.env.DB_PASSWORD}`);
console.log(`api key: ${process.env.API_KEY}`);
console.log(`node env: ${process.env.NODE_ENV}`);

console.log(`디비 포트: ${process.env.DB_PORT || 5432}`); // 없는 값 추가. || 기호를 사용해서 기본값 줄 수 있음

if (!process.env.OPENAI_API_KEY) {
  console.error(`오픈 ai의 키가 필요합니다.`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log(`개발환경에서의 로직 처리`);
} else {
  console.log(`운영환경에서의 로직 처리`);
}
