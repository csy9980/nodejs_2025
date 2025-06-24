const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자이름 2~ 5자리까지 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 중복된 이메일 가입 불가
      validate: {
        isEmail: true, // 이메일 형식이어야만 가능
      },
    },
    password: {
      // 단방향 암호화 bcrypt 라이브러리 사용
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

// 2. 게시판모델 정의
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// 3. 답글모델 정의
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

User.hasMany(Post, {
  foreignKey: "authorId", // FK컬럼명 지정
}); // 1(User): N(Post) 하나의 유저는 여러개의 게시물을 갖는다.
Post.belongsTo(User, {
  foreignKey: "authorId", // 동일한 FK 컬럼명 지정해야함
}); // N(Post) : 1(User) post는 user에 속한다.
// post테이블에 forgein key로 user 잡힌다.

// 4. User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" }); // 동일한 컬럼명 지정
Comment.belongsTo(User, { foreignKey: "userId" }); // FK 컬럼명 지정
// 5. Comment <-> Post
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 유저 ID가 있다.
  // 1. 사용자 정보
  const user1 = await User.create({
    username: "홍길동",
    email: "email@email.com",
    password: "12345678",
    age: 40,
  });
  const user2 = await User.create({
    username: "트럼프",
    email: "trump@email.com",
    password: "12345678",
    age: 87,
  });

  // 2. 게시글 정보
  const post1 = await Post.create({
    title: "post1",
    content: "content1",
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "두번째 게시글",
    content: "게시글 내용입니다아아아아아아",
    authorId: user2.id,
  });

  // 댓글 입력
  const comment1 = await Comment.create({
    content: "content comment",
    userId: user1.id,
    postId: post2.id,
  });
  const comment2 = await Comment.create({
    content: "content comment2",
    userId: user1.id,
    postId: post2.id,
  });
  const comment3 = await Comment.create({
    content: "content comment3",
    userId: user1.id,
    postId: post2.id,
  });

  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();
