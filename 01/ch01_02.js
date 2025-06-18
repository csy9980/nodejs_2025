let pi;
console.log(pi); // undefined
pi = 3.141592
console.log(pi); // 3.141592

let radius = 12;
console.log(`넓이: ${pi * radius * radius}`);
console.log(`둘레: ${pi * 2 * radius}`);

radius = 15;
let area = radius * radius * pi;
console.log(area);

let width = 10;
let height = 10;
let area2 = width * height;
console.log(area2);

let num = 0
num++;
console.log(num);
num--;
console.log(num);


console.log(String(52)); // '52'
console.log(typeof String(52)); // String

console.log(Number("52"));
console.log(typeof Number("52")); // number

console.log(parseInt("1234")); //1234 문자열을 숫자로 변환
console.log(parseInt("1234.56")); //1234 정수만
console.log(parseFloat("1234.56")); //1234.56 소수점 아래까지

console.log(Number("hello"));
console.log(isNaN(Number("hello"))); //숫자인지 아닌지 check

// javascript 데이터 타입
console.log(typeof 10); // typeof - 데이터 형태 알려주는 함수
console.log(typeof 'hello'); // string
console.log(typeof true); // boolean
console.log(typeof function(){}); // function
console.log(typeof {}); // object
console.log(typeof []); // object

const test = "변경불가"
// test = "값이 변경안됨" . const 는 상수 선언. 변경 x
console.log(test);

