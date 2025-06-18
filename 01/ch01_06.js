// 이지훈이라는 객체를 표현하려면 별도의 변수를 일일히 다 만들어줘야함
// const name = "이지훈";
// const age = 40;
// const job = "developer";
// 따라서 다음과 같이 key: value를 사용해서 나타내준다.

const person1 = {
    name: '이지훈',
    age: 40,
    job: 'developer'
}
console.log(person1.name, person1['name']);
person1. hobby = ["cook", "fishing"]; // 객체 속성 삽입
console.log(person1);
console.log(Object.keys(person1)); //키 목록만 반환
console.log(Object.values(person1)); //값 목록만 반환

person1.addAge = function(){ // 객체에 함수 삽입
    this.age = this.age + 1;
}
person1.addAge();
console.log(person1);

// 클래스로 객체 정의
class PersonInfo {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age){
        this.age = this.age + age;
    }

    getAge(){
        return this.age
    }    
}

let p1 = new PersonInfo("이지훈", 50, "신정동");
console.log(p1);
p1.addAge(50);
console.log(p1.getAge());

// 상속
class Employee extends PersonInfo {
    constructor(name, age, address, salary){
        super(name, age, address)
        this.salary = salary;
    }
}
let e1 = new Employee("홍길동", 60, "인천 부평", 1000000)
console.log(e1);


try {
    // 예시)
    // 데이터베이스 커넥션 얻어와서
    // 데이터베이스에 데이터 질의
    const arr = new Array(-1);
} catch(e) {
    // 데이터 질의하다가 예외 발생시 처리
    console.log("예외 발생", e);
} finally {
    // 데이터베이스 커넥션 닫아주기
    console.log("예외가 발생해도 이 작업은 반드시 필요")
}


// 커스텀 에러
try {
    const err = new Error("나만의 에러"); //에러를 만들어서
    err.name = "나만의 에러: "
    err.message = "나만의 에러가 완성되었어요."
    throw err // 에러를 던진다
} catch(e) { // e는 try문에서 발생한 에러정보를 담은 객체의 변수이름.
    console.log(e.name, e.message);
}


// 클래스명은 CarInfo, 속성은 brand, color, model : string타입
// 메서드는 drive() => "모델 xx가 달리는 중", stop() -> "모델 xx가 멈췄습니다."
// 객체를 2개정도 생성 후에 drive, stop 메소드 호출

class CarInfo {
    constructor (brand, color, model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }
    drive(){
        console.log(`모델 ${this.model}이 달리는 중`);
    }
    stop(){
        console.log(`모델 ${this.model}이 멈췄습니다.`);
    }
}

let c1 = new CarInfo("hyundai", "red", "ev5");
let c2 = new CarInfo("테슬라", "silver", "주니퍼");
c1.drive();

// 문제2
class ElectricCarInfo extends CarInfo {
    constructor(brand, color, model, battery) {
        super(brand, color, model);
        this.battery = battery;
    }
    charge() {
        console.log(`모델 ${this.model}가 충전 중`)
    }
    stop() {
        console.log(`모델 ${this.model}가 멈췄습니다.`)
    }
}
let ec1 = new ElectricCarInfo("테슬라", "silver", "주니퍼", 40000);
ec1.charge();

