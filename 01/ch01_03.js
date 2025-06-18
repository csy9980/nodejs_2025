let date = new Date();

if (date.getHours() < 12) {
    console.log("오전");
} else {
    console.log("오후");
}

const hour = date.getHours();
const timeOfDay = hour < 12 ? "오전" : "오후";
console.log(`현재는 ${timeOfDay}입니다.`);

const temperature = 24;
//문제1. 온도가 30도 넘어가면 더운 날씨입니다 출력
//      20도가 넘어가면 따뜻한 날씨입니다 출력
//      10도가 넘어가면 선선한 날씨입니다 출력
//      나머지는 추운 날씨입니다 출력

if (temperature > 30) {
    console.log("더운 날씨입니다.");
} else if (temperature > 20) {
    console.log("따뜻한 날씨입니다.");
} else if (temperature > 10) {
    console.log("선선한 날씨입니다.")
} else {
    console.log("추운 날씨입니다.");
}

const day = date.getDay();
console.log(day);

//문제 2 스위치 문으로 요일을 출력해주세요
//      day == 1 이면 월요일, 2이면 화요일....

switch (day) {
    case 0 : console.log("월요일");
            break;
    case 1 : console.log("화요일")
            break;
    case 2 : console.log("수요일")
            break;
    case 3 : console.log("목요일")
            break;                        
    case 4 : console.log("금요일")
            break;
    case 5 : console.log("토요일")
            break;            
    case 6 : console.log("일요일")
            break;     
    default : console.log("알수없는요일");
}

//짦은 조건문
const name = ""; // null, "", 0인경우 해당
const displayName = name || "익명"; // || name에 값이 없으면 "익명"으로 들어가고 name에 값이 있으면 그 값이 들어감
console.log(`환영합니다 ${displayName}`);

// nullish 병합연산자
const userInput = null;   // null 또는 undefined인 경우만
const defaultValue = "기본값";
const result = userInput ?? defaultValue; // ?? null또는 undefined일경우 defaultValue반환. 아닐경우 userInput반환
console.log(`결과: ${result}`);

// 조건부 실행
const isLoggedIn = true; 
isLoggedIn && console.log("로그인 되었습니다."); // true일때 && 우측에 있는 값 반환 
