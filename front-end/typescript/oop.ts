// 일반적인 직원 정보
let empName : string;
let age : number;
let job : string;

function printEmp(empName : string, age : number, job : string) : void{
  console.log(`${empName}의 나이는 ${age}, 직업은 ${job}`);
}

printEmp("kim", 20, "developer");

class Employee{
  // private _empName : string;
  // private _age : number;
  // private _job : string;
  // constructor(empName :string, age:number, job?:string){
  //   this._empName = empName;
  //   this._age = age;
  //   this._job = job || 'student';
  // };
  constructor(
    private _empName : string,
    private _age : number,
    private _job : string
  ){}

  get empName(){
    return this._empName;
  }

  set empName(val : string){
    this._empName = val;
  }
  
  printEmp = () : void =>{
    console.log(`${this._empName}의 나이는 ${this._age}, 직업은 ${this._job}`);
  }
}

let employee1 = new Employee("kim",21);
employee1.empName = 'lee';
employee1.printEmp();