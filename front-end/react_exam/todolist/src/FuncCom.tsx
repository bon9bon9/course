export function FuncCom1(){
  return(
    <div>
      함수형 컴포넌트
    </div>
  )
}

type exProps = {
  example : string
}

export const FuncCom2 : React.FC<exProps> = (props) =>{
  return (
    <div>
      {props.example}
    </div>
  )
}

export const FuncCom3 = (props : exProps) =>{
  return (
    <div>
      {props.example}
    </div>
  )
}

// 이게 클래스형 컴포넌트 보다 더 권장된다
