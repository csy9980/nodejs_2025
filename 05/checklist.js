const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

// 테이블 생성
const create_sql = `
    create table if not exists checklist (
        id integer primary key autoincrement,
        category text,
        item text,
        amount integer,
        checkyn boolean default 0
    );
`;
db.exec(create_sql);

// 1. 체크리스트 입력
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  const result = db
    .prepare(`insert into checklist (category, item, amount) values (?, ?, ?);`)
    .run(category, item, amount);

  const newCheckList = db
    .prepare(`select * from checklist where id = ?`)
    .get(result.lastInsertRowid);

  res.status(201).json({ message: "ok", data: newCheckList });
});

// 2. 체크리스트 목록 조회 GET
app.get("/checklist", (req, res) => {
  const q = req.query.q;
  const rows = db.prepare(`select * from checklist where category = ?`).all(q);
  res.status(200).json({ message: "ok", data: rows });
});

// 3. 체크리스트 수정
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `UPDATE checklist SET checkyn = CASE checkyn WHEN 1 THEN 0 ELSE 1 END WHERE id = ?`
  ).run(id);
  const item = db.prepare(`select * from checklist where id = ?`).get(id);
  res.status(200).json({ message: "ok", data: item });
});

// 4. 체크리스트 삭제 DELETE checklist/:id
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from checklist where id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  if (result.changes == 0) {
    res.status(404).json({ message: "항목을 찾을 수 없습니다." });
  }
  res.status(204).send();
});

app.listen(PORT, () => {});
