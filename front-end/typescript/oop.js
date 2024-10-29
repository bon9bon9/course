// 일반적인 직원 정보
var empName;
var age;
var job;
function printEmp(empName, age, job) {
    console.log("".concat(empName, "\uC758 \uB098\uC774\uB294 ").concat(age, ", \uC9C1\uC5C5\uC740 ").concat(job));
}
printEmp("kim", 20, "developer");
var Employee = /** @class */ (function () {
    // private _empName : string;
    // private _age : number;
    // private _job : string;
    // constructor(empName :string, age:number, job?:string){
    //   this._empName = empName;
    //   this._age = age;
    //   this._job = job || 'student';
    // };
    function Employee(_empName, _age, _job) {
        var _this = this;
        this._empName = _empName;
        this._age = _age;
        this._job = _job;
        this.printEmp = function () {
            console.log("".concat(_this._empName, "\uC758 \uB098\uC774\uB294 ").concat(_this._age, ", \uC9C1\uC5C5\uC740 ").concat(_this._job));
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        set: function (val) {
            this._empName = val;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee("kim", 21);
employee1.empName = 'lee';
employee1.printEmp();
