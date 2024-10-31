import React, { Component } from "react";

interface MyProps{
  weather : string;
  children : React.ReactNode;
}

export const MyWeather : React.FC<MyProps> = ({children,weather}) => {
  return(
    <div>
      {children}
      <p></p>
      오늘의 날씨는 {weather} 입니다.
    </div>
  )
}

export class MyWeather2 extends Component<MyProps>{
  render(){
    const {children,weather} = this.props;
    return(
      <div>
        {children}
        <p></p>
        오늘의 날씨는 {weather} 입니다.
      </div>
    )
  }
}