if(true){
    var num1 = 7;
    const num2 = 3; // 블록{} 스코프
    let num3 = 5; // 블록{} 스코프

    console.log(num1+"x"+num2+"="+num3);
    console.log(`${num1}x${num2}=${num3}`)
}

console.log(num1);
// console.log(num2); -- 에러 발생!
// console.log(num3); -- 에러 발생!

function callbackTest(){
    console.log("나 불렸다잉");
}

function f1(paramFunction){
    paramFunction("f1 test");
}

function f2(){
    console.log("f2시작");
}

f1(function(){
    callbackTest();
});

f2(function(){
    callbackTest();
});