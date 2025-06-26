const path = require("path");
const express = require("express");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const models = require("./models");
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

app.use("/notes", noteRouter); // notes url로 들어오는 주소는 전부 noteRouter 가 처리
app.use("/todos", todoRouter);
app.use("/posts", postRouter);

// 모든 라우터 최하단에
// 404 처리 용도
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없습니다.",
  });
});

// 500 의 경우에도 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: `server error: ${err.stack}`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.error("db error");
      process.exit();
    });
});
