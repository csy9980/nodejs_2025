const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const models = require("./models");
const app = express();
const { logger, logging } = require("./middlewares/logger");

// 미들웨어 설정
app.use(logging); // 로깅미들웨어
app.use(express.json()); //json 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// swagger 설정
// swagger.yaml 파일에서 문서 로딩
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
// http://localhost:3000/api-docs 에서 스웨거 서비스
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/notes", noteRouter); // notes url로 들어오는 주소는 전부 noteRouter 가 처리
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

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
