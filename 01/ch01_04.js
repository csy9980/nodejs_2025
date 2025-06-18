let arr = [5, 23, "hello", true, "world", -9];
console.log(arr);
console.log(arr[1]);

// for (초기조건; 종료조건; 증감조건)
for(let i=0; i<arr.length; i++){
    console.log(`${i} is ${arr[i]}`);
}
console.log('-------------------');

// for .. in  i <= index
for( i in arr ) {
    console.log(`${i} is ${arr[i]}`);
}

// for .. of  index없이 요소만 바로
for(e of arr) {
    console.log(e);
}

// break 문
//let arr = [5, 23, "hello", true, "world", -9];
console.log('-----------break-----------')
for(i in arr) {
    if(typeof arr[i] == "string") {
        break;
    }
    console.log(arr[i]);
} // 5, 23 뒤로는 실행안함

// continue 문
console.log('-----------continue-----------')
for(i in arr) {
    if(typeof arr[i] == "string") {
        continue;
    }
    console.log(arr[i]);
} 


console.log('-----------문제1-----------')
// [1,2,"멈춰", 3, 4, true, false] 에서 멈춰가 나오면 멈추는 코드
const p1 = [1,2,"멈춰", 3, 4, true, false]
for(i in p1){
    if(p1[i] == "멈춰") {
        break;
    }
    console.log(p1[i]);
}

console.log('-----------문제2-----------')
// [5,10, 15, 20, 25] 에서 20 이상이 나오면 멈추는 코드
const p2 = [5,10, 15, 20, 25]
for (i in p2) {
    if(p2[i] >= 20){
        break;
    }
    console.log(p2[i]);
}

console.log('-----------문제3-----------')
//[1,2,3,4,5,6,7,8,9,10]에서 짝수만 나오는 코드. continue사용
const p3 = [1,2,3,4,5,6,7,8,9,10]
for (i in p3) {
    if(p3[i] % 2 == 1) {
        continue;
    }
    console.log(p3[i]);
}

console.log('-----------문제4-----------')
// 1부터 10까지 돌면서 3의 배수는 건너뛰고 나머지 출력
for (let i =1; i<=10; i++) {
    if(i % 3 == 0) {
        continue;
    }
    console.log(i);
}

console.log('-----------문제5-----------')
// ['사과', 1, '바나나', 2, '포도', false]에서 문자열만 나오는 코드
const p5 = ['사과', 1, '바나나', 2, '포도', false];
for (i in p5) {
    if(typeof p5[i] !== 'string'){
        continue;
    }
    console.log(p5[i]);
}