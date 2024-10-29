// function logName(name : string){
//   console.log(name);
// }

// logName('heetwo');

// -------------------------------------------

// let student = {
//   name : 'john',
//   course : 'typescript',
//   score : 100,
//   grade : function(){
//     console.log('A');
//   }
// }

// student.name = 'kim';

// student.score = 'kim'; => 에러남'

// -------------------------------------------
// 변수의 데이터 타입 명시
let stdId : number = 1111;
let stdName : string = 'lee';
let age : number = 20;
let gender : string = "male";
let course : string = "TypeScript";
let completed : boolean = false;

// 함수의 데이터 타입 명시(매개변수, 리턴타입)
function plus(a :number,b? : number) : number{
  if(b === undefined) b = 1;
  return a+b;
}

// function getInfo(id : number) : {
//   stdId : number;
//   stdName : string;
//   age : number;
//   gender : string;
//   course : string;
//   completed : boolean;
// }{
//   return {
//     stdId : stdId,
//     stdName : stdName,
//     age : age,
//     gender : gender,
//     course : course,
//     completed : completed
//   }
// }

interface Student{
  stdId : number;
  stdName : string;
  age : number;
  gender : string;
  course : string;
  completed : boolean;
  setName? : (name : string) => void;
  getName? : () => string;
}

// function getInfo(id :number) : Student {
//   return {
//     stdId : stdId,
//     stdName : stdName,
//     age : age,
//     gender : gender,
//     course : course,
//     completed : completed
//   }
// }

// function setInfo(student : Student) : void{
//   stdId = student.stdId;
//   stdName = student.stdName;
//   age = student.age;
//   gender = student.gender;
//   course = student.course;
//   completed = student.completed;
// }

class MyStudent implements Student{
  stdId = 1111;
  stdName = 'lee';
  age = 20;
  gender = "male";
  course = "TypeScript";
  completed = false;
  setName(name : string) : void{
    this.stdName = name;
  }
}

const myInstance = new MyStudent();
myInstance.setName("엘리스");
console.log(myInstance.stdName);

type strOrNum = number | string;

let item : number;
let numStr : strOrNum = '100';

function convertToString(val : strOrNum) : string{
  return String(val);
}

function convertToNumber(val : string) : number{
  if(typeof val === 'string'){

  }
  return Number(val);
}

