const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  //1. 모델로 테이블을 생성하는 코드
  await sequelize.sync({ force: false });

  //2. 사용자 2명 생성. 각각 결과 출력
  const user1 = await User.create({
    username: "suyoung",
    password: "password123",
    email: "email@email.com",
    birthDate: "1986-11-29",
  });
  // console.log(`user1 created => ${JSON.stringify(user1)}`);
  const user2 = await User.create({
    username: "doi",
    password: "password307",
    email: "doidoi@email.com",
    birthDate: "2023-03-07",
  });
  // console.log(`user2 created => ${JSON.stringify(user2)}`);

  //3. 사용자 전체 검색
  const userAll = await User.findAll();
  console.log(`userAll findAll => ${JSON.stringify(userAll)}`);

  //4. 사용자 아이디 2번인 사람 출력
  const userid2 = await User.findByPk(2);
  console.log(`userid2 => ${JSON.stringify(userid2)}`);

  //5. 사용자 아이디 2번인 사람 email을 jihooni@kakao.com으로 바꾸고 출력
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const userid2M = await User.findByPk(2);
  console.log(`userid2M => ${JSON.stringify(userid2M)}`);

  //6. 사용자 아이디 2번인 사람 삭제 후 출력
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const userid2D = await User.findByPk(2);
  console.log(`userid2D => ${JSON.stringify(userid2D)}`);
})();
