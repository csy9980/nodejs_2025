const fetchData = (callback) => {
  // callback에 handleData가 들어감
  setTimeout(() => {
    // 서버에서 데이터를 받는 부분
    const data = "서버에서 받은 데이터라고 가정";
    callback(data);
  }, 1000);
};

const handleData = (data) => {
  // 서버에서 받은 데이터를 처리하는 내용. 예를 들면 데이터 파싱 등
  console.log("콜백에서 받은 데이터", data);
};

// fetchData(handleData)

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    // resolve, reject는 함수
    setTimeout(() => {
      const success = true; // 작업 성공여부
      // 외부에서나 DB에서 데이터를 가지고 오는 로직이 있는 자리
      if (success) {
        resolve(); // 성공했을 때 호출되는 함수. 예) 외부에서 데이터 가져오는데 성공
      } else {
        reject(); // 실패했을 때 호출되는 함수. 예) 외부에서 데이터 가져오는데 실패
      }
    }, 1000);
  });
};
fetchDataPromise() // 외부 라이브러리들이 이런 형태로 함수를 제공
  .then(() => {
    // resolve -> 데이터 패치가 성공했을 때 실행
    console.log("프로미스에서 받은 데이터", data);
  })
  .catch((error) => {
    // reject -> 데이터 패치가 실패했을 때 실행
    console.log("에러", error);
  });

const getData = async () => {
  try {
    const data = await fetchDataPromise();
    console.log("async/await", data); // 데이터 패치가 성공했을 때 처리로직. resolve 역할
  } catch (e) {
    console.log("에러", error); // 데이터 패치가 실패했을 때 처리로직. reject 역할
  }
};

// 2초 후에 "안녕하세요!" 라는 메시지를 출력하는 Promise 만들고 실행.
const greet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("안녕하세요!");
    }, 2000);
  });
};
greet().then((message) => {
  console.log(message);
});

const sayHi = async () => {
  try {
    const data2 = await greet();
    console.log("async/await greet", data2);
  } catch (error) {
    console.log("에러", error);
  }
};
