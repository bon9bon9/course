// Promise "객체" : 약속을 지키는 친구

let promise = new Promise(function(resolve, reject){ // 매개변수로 함수를 받는다
    // executor : 이 친구가 할 일
    // 일을 다하면 무조건 콜백함수 resolve() 또는 reject() 둘 중 하나는 호출
    // 할 일을 성공적으로 하면 resolve(결과) 실패하면 reject(에러)
    setTimeout(() => resolve("완료!") ,3000);
}).then(function(result){
    console.log(result);
    return result + "!!!!!";
}, function (error){
}).then(function(result){
    console.log(result);
});