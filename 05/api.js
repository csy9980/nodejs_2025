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
app.use((req, res, next) => {
  console.log("첫번째 미들웨어");
  next();
});

// 1. post.db 게시판 전용 테이블을 만든다
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );    

    create table if not exists comments (
      id integer primary key autoincrement,
      content text,
      author text,
      createdAt datetime default current_timestamp,
      postId integer,
      foreign key(postId) references posts(id) on delete cascade 
    );
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
  const result = stmt.run(title, content, author); // insert문 실행 후 자동 증가된 id 가 반환 - id 는 lastInsertRowid에 저장되어있음
  const newPost = db
    .prepare(`select * from posts where id = ?`)
    .get(result.lastInsertRowid);
  // stmt.run : UPDATE, INSERT, DELETE
  // stmt.all : SELECT * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값 반환
  // stmt.get : SELECT * FROM TABLE LIMIT 1 --> {} 객체로 값을 반환
  res.status(201).json({ message: "ok", data: newPost });
});

// 게시글 목록 조회 http://localhost:3000/posts?page=2 GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, author, createdAt, count
        from posts order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문 준비
  const rows = stmt.all(limit, offset); // 쿼리 실행하고 결과는 []배열로 반환

  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit); // 20/5 - 4

  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  });
  // res.status(200).json({ data: rows }); // JSON.stringify({data: rows}) 객체를 JSON문자열로 반환
});

// http://localhost:3000/posts/1 - 1번 게시물만 가져오기 // 게시글 상세 정보 조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  let ac_sql = `update posts set count = count + 1 where id = ?`;
  db.prepare(ac_sql).run(id);
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

  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }
  res.status(200).json({ message: "ok", data: updatedPost });
  // res.redirect("/posts");
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

// 답변 추가
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;
  // 1. 게시글이 있는지 확인
  const post = db.prepare(`select id from posts where id = ?`).get(postId); // 알맞은 게시글 번호인지 확인
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  // 2. 답변 추가
  const sql = `insert into comments(postId, author, content) values(?,?,?)`;
  const result = db.prepare(sql).run(postId, author, content);
  // 3. 신규 답변 조회 및 반환
  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newComment });
});

// 답변 목록 가져오기
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const post = db.prepare(`select id from posts where id = ?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  const sql = `
    select id, author, content, createdAt from comments where postId = ?
    order by id desc
  `;
  const comments = db.prepare(sql).all(postId);
  res.status(200).json({
    data: comments,
    message: "ok",
  });
});

// 답글 삭제
app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comment = db
    .prepare(`select id from comments where postId = ? and id = ?`)
    .get(postId, commentId);
  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  }
  const sql = `delete from comments where id = ?`;
  db.prepare(sql).run(commentId);
  res.status(204).end();
});

// 답글 수정(부분 업데이트)
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, content } = req.body;
  const comment = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);
  if (!comment) {
    return res.status(404).json({ message: "댓글이 없습니다." });
  }
  const newAuthor = author !== undefined ? author : comment.author;
  const newContent = content !== undefined ? content : comment.content;

  db.prepare(`update comments set author = ?, content = ? where id = ?`).run(
    newAuthor,
    newContent,
    commentId
  );
  const updatedComment = db
    .prepare(`select * from comments where id = ?`)
    .get(commentId);
  res.status(200).json({ message: "ok", data: updatedComment });
});

// server start
// npx nodemon api.js 실행
app.listen(PORT, () => {});
