// async-await : promise 객체를 좀 더 쉽고 편하게 사용하는 문법
// 즉, 비동기 처리가 쉽다!

// async 함수
// function f(){} : 일반 함수
// async funtion f(){} : async 함수

async function f(){
    return Promise.resolve(7); // promise 객체를 반환 중
    // 만약 반환값이 Promise가 아니면, Promise.resolve();
}


f().then(
    function(result){
        console.log("promise resolve :", result);
    },
    function(err){
        console.log("promise reject :",err);
    }
)

