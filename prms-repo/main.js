function foo1(){
  console.log('foo1');
}

const foo2 = function(){
  console.log('foo2');
}

const foo3 = new Function("console.log('foo3')")

const foo4 = () => {
  console.log('foo4');
}

foo1();
foo2();
foo3();
foo4();

(function foo5() {
  console.log('foo5');
})(); // 즉시 실행함수 이러면 선언과 동시에 실행됨

function foo6(arg){
  arg();
}

foo6(() => {
  console.log("foo6");
})