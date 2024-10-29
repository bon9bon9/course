// gender는 어차피 female과 male밖에없는데 enum으로 하자!

interface Students{
  stdId : number;
  stdName : string;
  age : number;
  gender : GenderType;
  course : string;
  completed : boolean;
  setName? : (name : string) => void;
  getName? : () => string;
}

enum GenderType{
  Male,
  Female
}