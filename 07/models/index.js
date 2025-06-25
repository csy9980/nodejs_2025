"use strict";
// 필요한 모듈 임포트
const fs = require("fs"); // 파일시스템 todos.js같은 파일을 읽어야함
const path = require("path"); // 경로 임포트
const Sequelize = require("sequelize"); // 시퀄라이즈 임포트
const process = require("process"); // 환경변수 처리 위해서
const basename = path.basename(__filename); // index.js가 위치한 디렉토리 위치
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV가 없으면 development를 사용. development는 config.js에 있음
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// 시퀄라이즈 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 파일 읽기. 현재 index.js 디렉토리에 있는 파일 모두 읽음
fs.readdirSync(__dirname)
  .filter((file) => {
    // 확장자가 없거나 .js가 아니거나 .test.js로 끝나는 파일이 아닌경우 모두 읽음
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // 읽은 파일 목록을 순회하면서 [todo.js]
    // 파일 하나씩 여기서 작업
    // require("./todo.js")
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    // db["Todo"] = Todo
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
