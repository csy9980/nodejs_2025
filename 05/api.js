const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

//DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

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
db.exec(create_sql);

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author)
        values( ?, ?, ?);
        `;
  db.prepare(sql).run(title, content, author); // 쿼리문 파싱해서 런...
  res.status(201).json({ message: "ok" });
});

// 게시글 목록 조회
app.get("/posts", (req, res) => {
  let sql = `
        select id, title, content, author, createdAt
        from posts order by createdAt desc
    `;
  const stmt = db.prepare(sql); // 쿼리 준비
  const rows = stmt.all(); // 쿼리 날리기
  console.log(rows);
  res.status(200).json({ data: rows });
});

// http://localhost:3000/posts/1 - 1번 게시물만 가져오기 // 게시글 상세 정보 조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql);
  const post = stmt.get(id);
  res.status(200).json({ data: post });
});

// 게시글 수정
// http://localhost:3000/posts?key=1&value=1 - req.query이용
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title = ?, content = ?
        where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스에서 실행
  res.redirect("/posts");
  // res.json({message: "ok"});
});

// 게시글 삭제

// server start
app.listen(PORT, () => {});
