const express = require("express");
const models = require("./models");
const multer = require("multer"); // 멀터 임포트
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
//formdata, multi part form 데이터를 받기위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));
// http://localhost:3000/downloads/aa.png

// 멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // posts.js파일이 있는 디렉토리 하위로 uploadDir 만들어주세요
  filename: function (req, file, cb) {
    // file.originalname : aa
    // -
    // 1781029281
    // .png
    // fname = aa-1781029281.png 파일명을 유니크하게 하기위한 함수를 만들어줌
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, //Error
      fname
    );
  },
});
const upload = multer({ storage: storage });

// 1. POST / posts요청이 들어오면 upload.single("file") 미들웨어를 탐
// upload 미들웨어의 역할은 첨부파일을 uploadDir 폴더에 aa-1781029281.png 로 저장을 해서 req 객체에 첨부파일 정보를 실어줌.
// 2. 핸들러 함수에서 req.file 객체에서 파일 정보를 사용.

app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;
  // http://localhost:3000/ + filename -> http://localhost:3000/downloads/aa-11111.png

  // 원래 jwt 토큰에서 사용자 ID받아와서 넣어줘야하지만
  // 사용자를 생성하고 그 다음에 게시글 넣을 것
  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    const user = await models.User.create({
      name: "최수영",
      email: "a@example.com",
      password: "1234567",
    });
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
    fileName: filename, // 첨부파일
  });
  res.status(201).json({ message: "ok", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  res.status(200).json({ message: "ok", data: post });
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });
  console.log(result);
  if (result > 0) {
    res.status(200).json({ message: "삭제가 완료되었습니다." });
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
});

// comment 관련된 코드
// 댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  // 게시물 존재여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "김도이",
      email: "b@example.com",
      password: "12345678",
    });
  }
  // userId 로그인 뒤에 jwt 토큰에서 받아야하지만 지금은 없기때문에 1
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
});

// 댓글 목록 가져오기
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [
      ["createdAt", "DESC"],
      // ["content", "DESC"],
    ],
  });
  res.status(200).json({ message: "ok", data: comments });
});

// 댓글 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물 있는지 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. 댓글을 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  //  댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const result = await models.Comment.destroy({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

app.listen(PORT, () => {
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db started");
    })
    .catch(() => {
      console.error("db error");
      process.exit();
    });
});
