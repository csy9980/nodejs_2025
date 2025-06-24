const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "users.db",
});

// 회원모델 정의
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
(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "name1",
    email: "email1@email.com",
    password: "1234567",
    age: "12",
  });
  const user2 = await User.create({
    username: "name2",
    email: "email2@email.com",
    password: "1234578",
    age: "20",
  });
  const user3 = await User.create({
    username: "name3",
    email: "email3@email.com",
    password: "123456",
    age: "31",
  });
  const user4 = await User.create({
    username: "name4",
    email: "email4@email.com",
    password: "1234567",
    age: "45",
  });
  const user5 = await User.create({
    username: "name5",
    email: "email5@email.com",
    password: "12345678",
    age: "52",
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "%.com%",
      },
    },
  });

  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["name1", "name2"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 20, //lt == '<', gt = '>', lte == '<=', gte == '>='
      },
    },
  });
  console.log(users3);
})();
