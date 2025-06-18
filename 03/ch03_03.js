const moment = require("moment");

const nowDate = moment(); // 현재 시각을 가져옴
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYY년 MM월 DD일 HH시 mm분 ss초"));

// 문제1 현재 날짜 + 시각을 2025/06/18 형태로 출력
console.log(nowDate.format("YYYY/MM/DD"));

// 과거 특정 날짜의 문자열을 moment 객체 형태로 변경
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// 시간 추가 및 빼기
const nextDays = nowDate.add(7, "days"); // 7일 후의 날짜 그외 weeks, months 등도 가능
console.log(nextDays);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 날 수", diffDay);

// 문제2 오늘부터 100일 후의 날짜를 YYYY년 MM월 DD일로 출력
const today = moment();
const after100 = today.add(100, "days");
console.log(
  `${moment().format(
    "YYYY년 MM월 DD일"
  )} 에서 100일 후의 날짜는 ${after100.format("YYYY년 MM월 DD일")}`
);

// 문제3 2024-03-15 부터 2025-09-20일까지 몇 개월이 지났는지 계산하기
const startDate2 = moment("2024-03-15");
const endDate2 = moment("2025-09-20");
const diffDay2 = endDate2.diff(startDate2, "months");
console.log("지난 개월 수", diffDay2);

// 문제4 크리스마스까지 남은 일 수를 계산하기
const nowDate2 = moment();
const christmas = moment("2025-12-25");
const diffDay3 = christmas.diff(nowDate2, "days");
console.log("크리스마스까지", diffDay3);

require("moment/locale/ko"); // 한국어 로케일 불러오기
moment.locale("ko"); // 한국어 로케일 설정
const s3 = moment();
console.log(`요일: ${s3.format("d")}`); // 3
console.log(`요일: ${s3.format("dd")}`); // w
console.log(`요일: ${s3.format("ddd")}`); // wed
console.log(`요일: ${s3.format("dddd")}`); // wednesday

// 문제5 올해 크라스마스는 무슨 요일일까
const xmas = moment("2025-12-25");
console.log(`올해 크리스마스는 ${xmas.format("dddd")}`);

// 문제6 자신이 태어난 날의 요일 출력
const myBirth = moment("1986-11-29");
console.log(`내가 태어난 날은 ${myBirth.format("dddd")}`);
