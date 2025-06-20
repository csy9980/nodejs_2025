const express = require("express"); // express모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); //경로 모듈 임포트

//DB setting
const db_name = path.join(__dirname, "post.db"); // sqlite용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3의 데이터베이스를 생성(with 데이터베이스 파일)

// express setting
const app = express(); // app이란 변수에 express함수를 담습니다. app 변수를 이용해서 express기능 사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨어 설정. 모든 요청과 응답에 json 포맷을 처리.

// 1. post.db 게시판 전용 테이블을 만든다
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    )    
`;
db.exec(create_sql); // exec sql을 샐행

// app.post - POST 요청을 처리. http://url주소/posts 에 POST 요청이 들어왔을 때 두번째 인자의 핸들러함수 실행
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body; // 요청 본문에서 title, content, author: json 포맷으로
  let sql = `
        insert into posts(title, content, author)
        values( ?, ?, ?);
        `;
  // insert 쿼리문을 만들어준다.
  const stmt = db.prepare(sql); // 문자열 sql을 실제 쿼리문으로 파싱. statement 객체로 만듬. /재활용성 극대화
  stmt.run(title, content, author);
  // stmt.run : UPDATE, INSERT, DELETE
  // stmt.all : SELECT * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값 반환
  // stmt.get : SELECT * FROM TABLE LIMIT 1 --> {} 객체로 값을 반환
  res.status(201).json({ message: "ok" });
});

// 게시글 목록 조회 http://localhost:3000/posts?page=2 GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, content, author, createdAt
        from posts order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문 준비
  const rows = stmt.all(limit, offset); // 쿼리 실행하고 결과는 []배열로 반환
  console.log(rows);
  res.status(200).json({ data: rows }); // JSON.stringify({data: rows}) 객체를 JSON문자열로 반환
});

// http://localhost:3000/posts/1 - 1번 게시물만 가져오기 // 게시글 상세 정보 조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문 준비
  const post = stmt.get(id); // {}로 반환
  res.status(200).json({ data: post }); // json 문자열로 반환
});

// 게시글 수정 (수정할 게시글 ID -> req.params에서 가져오고, 수정할 내용 -> req.body에서 가져옴 )
// http://localhost:3000/posts?key=1&value=1 - req.query이용
app.put("/posts/:id", (req, res) => {
  const id = req.params.id; // 수정할 게시글을 param에서 가져옴
  const { title, content } = req.body; // 수정할 게시글 내용을 body에서 가져옴
  let sql = `
        update posts set title = ?, content = ?
        where id = ?
    `; // 쿼리문 작성
  const stmt = db.prepare(sql); // 쿼리문 준비
  stmt.run(title, content, id); // 쿼리문 데이터베이스에서 실행 - stmt.run title, content, id ->개수나 순서 동일하게
  res.redirect("/posts");
  // res.json({message: "ok"});
});

// 게시글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 삭제할 게시글 아이디를 가져옴
  let sql = `delete from posts where id = ?`; // 쿼리문 만듬
  const stmt = db.prepare(sql); // 쿼리문 준비
  stmt.run(id); //쿼리문 실행
  res.json({ message: "ok" }); //결과로 응답
});

// server start
// npx nodemon api.js 실행
app.listen(PORT, () => {});
