// express + sequelize crud 를 제공하는 서버 코딩 / todos restful api 서버 코딩
// 관련된 모듈 임포트
const express = require("express");
const models = require("./models");
// require("./models/index.js") 와 같음
// models에는 index.js 맨 하단에 있는 db변수가 할당 됨
// models.Todo
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
});

app.get("/todos", async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일을 찾을 수 없습니다." });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save();
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일이 없습니다." });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({
    where: { id: id },
  });
  console.log(result); // result - 지운 행의 갯수 숫자로 나타냄
  if (result > 0) {
    res.status(200).json({ message: "삭제가 완료되었습니다." });
  } else {
    res.status(404).json({ message: "할 일이 없습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`Todo 서버가 http://localhost:${PORT} 에서 실행 중`);
  // db 테이블 생성
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
