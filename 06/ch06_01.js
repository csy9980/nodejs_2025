const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

// create table posts (
//     title text,
// )

(async () => {
  // 즉시 실행함수
  // sequelize에서는 Promise이용해서 작업하는데
  // async/await를 이용해서 Promise작업을 하기위해서 즉시 실행함수 안에서 코딩
  await sequelize.sync({ force: false }); // 테이블 실행할때마다 생성 -> true/ 추가, 추가 생성-> false

  const post1 = await Post.create({
    title: "오늘은 비가 내린다네",
    content: "저녁에 오면 좋겠다",
    author: "최수영",
  });
  // console.log(`post1 created => ${JSON.stringify(post1)}`);

  const post2 = await Post.create({
    title: "오늘 저녁은 뭐먹지",
    content: "입맛이 없다",
    author: "최수영",
  });
  // console.log(`post2 created => ${JSON.stringify(post2)}`);

  // select * from posts
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);
  // select * from posts where id = 1
  const post11 = await Post.findByPk(1);
  console.log(`post11 => ${JSON.stringify(post11)}`);

  const post12 = await Post.findOne({
    // 하나만 찾기
    where: {
      author: "최수영",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`);

  // UPDATE
  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 주입니다.",
      content: "ORM 어렵다...",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  // DELETE
  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`);
})();
