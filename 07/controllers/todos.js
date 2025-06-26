const models = require("../models");

exports.createTodo = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
};

exports.getAllTodos = async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
};

exports.getTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일을 찾을 수 없습니다." });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save();
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일이 없습니다." });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({
    where: { id: id },
  });
  console.log(result); // result - 지운 행의 갯수 숫자로 나타냄
  if (result > 0) {
    res.status(200).json({ message: "삭제가 완료되었습니다." });
  } else {
    res.status(404).json({ message: "할 일이 없습니다." });
  }
};

//const createTodo 로 만들면 아래처럼 한번에 작성

// module.exports = {
//     createTodo,
//     getAllTodos,
//     getTodo,
//     updateTodo,
//     deleteTodo
// }
