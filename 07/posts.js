const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

// 원래 jwt 토큰에서 사용자 ID받아와서 넣어줘야하지만
// 사용자를 생성하고 그 다음에 게시글 넣을 것
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
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

// 댓글 삭제
// app.delete("/posts/:postId/comments/:")

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
