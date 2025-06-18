// // path 다루기
const path = require("path");

// const fullPath = path.join(__dirname, "files", "test.txt"); // __dirname 은 현재 파일의 디렉토리 절대경로를 가져옴
// console.log(`전체 경로: ${fullPath}`);

// // 문제 1 fullPath2 변수에 현재디렉/files/taks/jobs/01.txt 경로를 만들어보세요.
// const fullPath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
// console.log(`경로: ${fullPath2}`);

// // 경로에 대한 정보 분리
// const pathParts = path.parse(fullPath);
// console.log(pathParts);

// // 문제 2. fullPath2 를 parse 이용해서 경로 분리
// const pathParts2 = path.parse(fullPath2);
// console.log(pathParts2);

// // 확장자만 가져오기
// const ext = path.extname(fullPath);
// console.log(ext);

// 디렉토리 만들기
const fs = require("fs");

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
if (!fs.existsSync(dirPath)) {
  // 경로가 있으면 true, 없으면 false -> 없으면 만들어라...
  fs.mkdirSync(dirPath);
}

// 문제 dirPath2 변수를 만들고 현재 디렉토리 밑에 tasks 디렉토리를 만들어요
const dirPath2 = path.join(__dirname, "tasks");
console.log(dirPath2);
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01");
if (!fs.existsSync(dirPath3)) {
  fs.mkdirSync(dirPath3, { recursive: true });
}

//디렉토리 생성 후 파일 생성
const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성 후 파일 생성 테스트");

// 문제2 현재 디렉토리 밑에 main/src/code/javascript.txt 파일을 생성하고 파일 안에 "자바스크립트 테스트 파일입니다."를 적어놓기
const dirPath4 = path.join(__dirname, "main", "src", "code");
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}
const filePath2 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath2, "자바스크립트 테스트 파일입니다.");

// 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); //경로 변경 == 디렉토리 변경

// 디렉토리 삭제
fs.rmdirSync(newDirPath);
