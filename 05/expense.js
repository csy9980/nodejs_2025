const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json()); // middleware - 전체 엔드포인트에 특정 기능을 일괄 적용

// date => YYYY-MM-DD
const create_sql = `
    create table if not exists expenses (
        id integer primary key autoincrement,
        title text not null,
        amount integer not null,
        date text not null,
        memo text
    )
`;
db.exec(create_sql);

// 1. 가계부 입력 POST/ expenses
app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;
  const formattedDate = moment(req.params.date).format("YYYY-MM-DD");
  const sql = `
        insert into expenses ( title, amount, date, memo)
        values (? ,? ,? ,? );
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, formattedDate, memo);
  res.status(201).json({ message: "ok" });
});

// 2. 가계부 목록 조회 GET/ expenses
app.get("/expenses", (req, res) => {
  const sql = `
        select * from expenses
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all();
  res.status(200).json({ data: rows });
});

// 3. 가계부 목록 조회 (날짜 순) GET/ expenses/ 2025-06-23 -> 해당되는 날짜의 내역만
app.get("/expenses/:date", (req, res) => {
  const formattedDate = moment(req.params.date).format("YYYY-MM-DD");
  const sql = `
        select * from expenses where date = ?
    `;
  const stmt = db.prepare(sql);
  const expense = stmt.all(date(formattedDate));
  res.status(200).json({ data: expense });
});

// 4. 가계부 수정 PUT/ expenses/12 -> 금액 수정, 항목 등 수정. 아이디 12번
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, memo } = req.body;
  const sql = `
        update expenses set title = ?, amount = ?, memo =?
        where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, memo, id);
  res.status(200).json({ message: "ok" });
});

// 5. 가계부 삭제 DELETE/ expenses/12 -> 해당 가계부의 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
        delete from expenses where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, () => {});
