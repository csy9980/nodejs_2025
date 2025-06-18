const fruits = ["사과", "수박", "바나나", "오렌지"];

const [first, second] = fruits;
console.log(first, second);

const student = {
  name: "이지훈",
  age: 50,
  grade: "B",
};

// const name = student.name;
// const age = student.age;
// const grade = student.grade;

// 객체 구조 분해 할당
const { name, age, grade } = student;
console.log(name, age, grade);
// 객체 구조 분해 - 다른 변수 이름으로 할당
const { name: name1, age: age1, grade: grade1 } = student;
console.log(name1, age1, grade1);

const person = {
  name: "홍길동",
};
// 객체 구조 분해 - 기본값 설정
const { name: personName, age: personAge = 25 } = person;

// 객체를 매개변수로 받는 함수
const printStudentInfo = ({ name, age, grade = "B" }) => {
  console.log(`학생정보`);
  console.log(`-이름: ${name}`);
  console.log(`-나이: ${age}`);
  console.log(`-성적: ${grade}`);
};
printStudentInfo(student); // 객체가 그대로 인자로 들어옴

//
const book = {
  title: "자바스크립트 최고",
  author: "홍길동",
  publisher: "한빛",
};

// 문제 1. book 객체를 출력하는 함수를 만드시오. printBook 매개변수 객체구조 분해 할당 이용
const printBook = ({ title, author, publisher }) => {
  console.log("책정보");
  console.log(`제목: ${title}`);
  console.log(`저자: ${author}`);
  console.log(`출판사: ${publisher}`);
};
printBook(book);

const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

const {
  id,
  info: {
    name: userName,
    address: { city: cityName, street },
  },
} = user;

console.log(`ID: ${id}`);
console.log(`이름: ${userName}`);
console.log(`도시: ${cityName}`);
console.log(`거리: ${street}`);

//
const colors = ["빨강", "파랑", "노랑", "초록", "보라"];
//문제: 첫번째 요소는 firstcolor, 두번째요소는 secondcolor 에 할당하세요.
const [firstcolor, secondcolor, ...others] = colors; // ...는 스프레드 연산자. 나머지..
console.log(firstcolor, secondcolor, others);

//문제
const user1 = { name: "소지섭", age: 45, email: "so@email.com" };
const user2 = { name: "전종서", age: 30 };
const formatUserInfo = ({ name, age, email = "이메일 없음" }) => {
  return `이름은 ${name} 나이는 ${age} email은 ${email}`;
};
console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));
