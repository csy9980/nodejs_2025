// todos 만들기
// task, description, completed, priority
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "todo.db",
});

// Todo 모델
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);

(async () => {
  // 문제1. 테이블명 todos 생성
  await sequelize.sync({ force: false });

  // 문제2. Todo 데이터 2개 입력
  const todo1 = await Todo.create({
    task: "task1",
    description: "todo task1",
  });
  const todo2 = await Todo.create({
    task: "task2",
    description: "todo task2",
  });

  // 문제3. Todo 데이터 전체 조회
  const todoAll = await Todo.findAll();
  console.log(`todoAll => ${JSON.stringify(todoAll)}`);

  // 문제4. Todo 아이디가 2번인 항목 조회
  const todo2F = await Todo.findByPk(2);
  console.log(`todo2F => ${JSON.stringify(todo2F)}`);

  // 문제5. Todo 아이디가 2번인 항목의 completed 를 완료로 변경
  await Todo.update(
    {
      completed: true,
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const todo2M = await Todo.findByPk(2);
  console.log(`todo2M => ${JSON.stringify(todo2M)}`);

  // 문제6. Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: {
      id: 2,
    },
  });
  const todo2D = await Todo.findByPk(2);
  console.log(`todo2D => ${JSON.stringify(todo2D)}`);
})();
