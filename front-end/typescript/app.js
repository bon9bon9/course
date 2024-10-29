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
var stdId = 1111;
var stdName = 'lee';
var age = 20;
var gender = "male";
var course = "TypeScript";
var completed = false;
// 함수의 데이터 타입 명시(매개변수, 리턴타입)
function plus(a, b) {
    if (b === undefined)
        b = 1;
    return a + b;
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
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 1111;
        this.stdName = 'lee';
        this.age = 20;
        this.gender = "male";
        this.course = "TypeScript";
        this.completed = false;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName("엘리스");
console.log(myInstance.stdName);
var item;
var numStr = '100';
function convertToString(val) {
    return String(val);
}
function convertToNumber(val) {
    if (typeof val === 'string') {
    }
    return Number(val);
}
