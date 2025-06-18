// 파일 다루기 fs 모듈 이용
const fs = require("fs");
// fs 모듈(파일 다루기 모듈) 임포트
// common.js방식으로 react의 import fs from "fs"같은 것(es6방식)

// fs.writeFileSync("test.txt", "hello world!");
// console.log("파일 쓰기 완료");

// // 문제1. hello.txt 만들고, 내용에는 안녕하세요 반갑습니다. 제 이름은 최수영입니다.
// fs.writeFileSync("hello.txt", "안녕하세요 반갑습니다. 제 이름은 최수영입니다.");

// // 파일 읽기
// const data = fs.readFileSync("test.txt", "utf-8"); // utf-8 인코딩
// console.log(data);

// // 문제2. hello.txt 읽어서 콘솔로 출력
// const data2 = fs.readFileSync("hello.txt", "utf-8");
// console.log(data2);

// // 파일 상태
// const stats1 = fs.statSync("test.txt");
// console.log(stats1);

// // 비동기 파일 쓰기
// fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
//   // writeFile 파일명, 파일내용, 함수
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료");
// });

// // 문제 3
// fs.writeFile("async-hello.txt", "안녕하세요 문제에요", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 테스트 작업 완료");
// });

// 비동기 파일 읽기
// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("읽기에러", err);
//   }
//   console.log("비동기 파일 읽기", data);
// });

// // 문제4. async-hello.txt fs.readFile로 읽어보세요.
// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("에러", err);
//   }
//   console.log("비동기 파일 읽기", data);
// });

// promise를 이용해서 파일쓰고 읽기
const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile("promise-test.txt", "Promise Hello World");
    console.log("파일 쓰기 완료");

    const data = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log("파일 읽기", data);
  } catch (e) {
    console.log(e);
  }
};
fileOp();

// 문제5. fileOp2함수를 만들고 promise 방식으로 promise-hello.txt 만들고 파일 읽기
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );
    console.log("파일 쓰기 완료");

    const data2 = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log("파일 읽기", data2);
  } catch (err) {
    console.log(err);
  }
};
fileOp2();
