// async-await : promise 객체를 좀 더 쉽고 편하게 사용하는 문법
// 즉, 비동기 처리가 쉽다!

// async 함수
// function f(){} : 일반 함수
// async funtion f(){} : async 함수

// async의 두번째 기능
// Promise 객체가 일이 끝날 때 까지 기다릴 수 있는 공간을 제공한다.

async function f(){
    let promise = new Promise(function(resolve, reject){
        setTimeout(() => resolve("완료"),3000);
    })

    let result = await promise;

    console.log(result);
}

// await은 async 함수 안에서만 동작!

f();

