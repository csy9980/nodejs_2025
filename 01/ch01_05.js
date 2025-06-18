function add1(x, y) { //선언함수
    return x + y;
}

console.log(add1(1,2));

const add2 = function(x, y){ //익명함수
    return x + y;
}
console.log(add2(2, 3));

const add3 = (x, y) => { //화살표함수
    return x + y
}
console.log(add3(3,4));

// 콜백 함수
const ten = (cb) => {
    for(let i= 0; i<10; i++){
        cb(); // ()의미 => 함수 실행하라
    }
}
ten(function(){
    console.log('call function');
});


setTimeout(function(){
    console.log(`1초 뒤에 호출`);
}, 1000); // 1000ms = 1초

setInterval(function(){
    console.log(`1초 마다 실행`);
}, 1000); // 1초 간격으로 주기적 실행