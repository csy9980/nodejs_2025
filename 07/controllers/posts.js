const models = require("../models");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "최수영",
      email: "a@example.com",
      password: "1234567",
    });
  }
  let attachments = [];
  if (req.file) {
    // single file
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    //multiple file
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
    //fileName: filename,
    attachments: attachments,
  });
  res.status(201).json({ message: "ok", data: post });
};

const getAllPost = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  const totalPosts = await models.Post.count();
  const posts = await models.Post.findAll({
    limit: pageSize,
    offset: offset,
  });
  const totalPages = Math.ceil(totalPosts / pageSize);

  res.status(200).json({
    message: "ok",
    data: {
      posts: posts,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: totalPosts,
        totalPages,
      },
    },
  });
};

const getPost = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  res.status(200).json({ message: "ok", data: post });
};

const updatePost = async (req, res) => {
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
};

const deletePost = async (req, res) => {
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
};

const createComment = async (req, res) => {
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
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
};

const getAllComment = async (req, res) => {
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
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
};

const deleteComment = async (req, res) => {
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
};

module.exports = {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
};
