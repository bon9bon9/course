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

const person = {
  name : 'person',
  address : {
    country : 'Korea',
    city : 'Seoul'
  }
}

let obj1 = {};
Object.defineProperty(obj1, 'name', {
  value: 'Alice',
  writable: false, // 쓰기 불가능
  enumerable: true,
  configurable: true
});

let obj2 = Object.assign({}, obj1);
console.log(Object.getOwnPropertyDescriptor(obj2, 'name')); 
// { value: 'Alice', writable: true, enumerable: true, configurable: true }

obj2.name = 'Bob'; // obj2의 name 속성 수정 가능
console.log(obj2.name); // 'Bob'
console.log(obj1.name); // 'Alice' - obj1은 영향을 받지 않음


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