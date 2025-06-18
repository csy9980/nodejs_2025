// 1. express 모듈 가져오기
const express = require("express");

// 2. express 애플리케이션 설정
const app = express();

// 3. 포트 설정
const PORT = 3000;

// 4. 라우팅 설정
// app.get GET요청을 처리하는데 http://localhost:3000
app.get("/", (req, res) => {
  // req: http 요청, res: http응답
  res.send("Hello World!");
});

// http://localhost:3000/hello GET
app.get("/hello", (req, res) => {
  res.send("안녕 /hello 주소에 접근하셨습니다. ");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 문제1. http://localhost:3000/world GET요청할 경우 응답을 "안녕 /world 주소에 접근하셨습니다."라우터 함수 생성
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하셨습니다.");
});
