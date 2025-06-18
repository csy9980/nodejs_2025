// filter 와 map

const users = [
  { id: 1, name: "홍길동", age: 25, score: 85 },
  { id: 2, name: "김철수", age: 27, score: 75 },
  { id: 3, name: "이영희", age: 28, score: 80 },
  { id: 4, name: "차은우", age: 25, score: 99 },
  { id: 5, name: "박보검", age: 23, score: 88 },
  { id: 6, name: "이지은", age: 21, score: 73 },
  { id: 7, name: "박보영", age: 26, score: 77 },
  { id: 8, name: "김민수", age: 21, score: 95 },
];

// 조건에 맞는 요소(return에 있는 식이 참인 경우)만 필터링
const youngs = users.filter((user) => {
  return user.age < 25; // 필터링 조건
});
console.log(youngs); // return 조건에 있는 애들만 반환해서 새 배열 생성 . select * from users where age < 25; 와 같은것

// 문제 1 점수가 80점 미만인 사람들
const under80 = users.filter((user) => {
  return user.score < 80;
});
console.log(under80);

const userNames = users.map((user) => {
  return user.name;
});
console.log(userNames);

// 문제 2 아이디와 이름만 반환하는 배열을 만들어보세요
const idNames = users.map((user) => {
  return { id: user.id, name: user.name };
});
console.log(idNames);

// 문제 3 성적인 80점 이상인 id, 이름, 성적
const over80 = users
  .filter((user) => user.score > 80)
  .map((user) => {
    return { id: user.id, name: user.name, score: user.score };
  });
console.log(over80);

users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}입니다.`);
});

// reduce 배열의 단일 값을 축소 sum: 누적변수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

// 문제4 나이가 25 이상인 사람들의 토탈 점수
const totalScore2 = users
  .filter((user) => {
    return user.age >= 25;
  })
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);
console.log(totalScore2);

// sort
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age; // a.age - b.age가 음수이면 a 가 b 앞에 있고, 양수이면 a 가 b 뒤로 가고, 0이면 아무 것도 안함
}); // 나이 오름차순 정렬
console.log(sortedByAge);
