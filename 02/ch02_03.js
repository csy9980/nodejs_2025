const http = require("http");

const server = http.createServer((req, res) => {
  // req는 http요청, res는 http응답
  // 내부 내용 = 요청 올때마다 실행되는 콜백함수라고 보면 됨
  res.writeHead(200, { "content-Type": "text/plain; charset=utf-8" }); // 브라우저에게 응답은 200 성공이고, content type이 text, 문자인코딩 포멧 utf- 8이라고 헤더정보를 알려줌
  res.end("안녕하세요. 최수영의 첫번째 웹서버에 오셨습니다."); // 본문의 내용을 클라이언트에 보내준다
}); // 웹서버 만드는 환경

const PORT = 3000;
server.listen(PORT, () => {
  // 서버가 3000번 포트로 요청을 기다리고 있다는 의미
  console.log(`나만의 웹서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

// 자주 사용하는 포트 번호
// 80 웹서버 기본 포트
// 443 보안 웹서버 포트 443
// 22 ssh 포트(원격 터미널 연결용) 22
// 21 ftp포트(대량 파일 전송)
// 25 smtp 메일
// 5432 postgres
// 3306 mysql

// 0~1023: 시스템 사용포트
// 1024~49151: 개발자 사용포트
// 49152 ~ 655535: 클라이언트 포트
