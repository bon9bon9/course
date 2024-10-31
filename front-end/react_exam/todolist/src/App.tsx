import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassCom from './ClassCom'
import {FuncCom1, FuncCom2,FuncCom3} from './FuncCom';
import {TodoList} from './todolist';
import {Timer,Clock} from './Timer';
import { MyWeather } from './myWeather';

function App() {
  let name = "리액트";
  const style ={
    backgroundColor : 'black',
    color : 'white',
    fontSize : '48px',
    fontWeight : 'bold',
    padding : '20px'
  }
  return ( // 리액트에서는 class를 안쓰고 className을 쓴당
    // <div className="container">
    //   <h1 className = "test">Hello, {
    //   name === "리액트" ? (<h1>YES</h1>) : (<h1>NO</h1>)
    //   }!</h1>
    //   <p style = {style}>반갑습니다.</p>
    //   {/* 주석은 이렇게 중괄호 열고 합니다. */}
    // </div>

    // <div className='container'>
    //   <ClassCom></ClassCom>
    //   <FuncCom1></FuncCom1>
    //   <FuncCom2></FuncCom2>
    // </div>
    <div className='container'>
      <TodoList></TodoList>
      {/* <Timer></Timer> */}
      <Clock></Clock>
      <FuncCom1></FuncCom1>
      <FuncCom2 example = "hello"></FuncCom2>
      <FuncCom3 example = "hello"></FuncCom3>
      <MyWeather weather="맑음">일기예보</MyWeather>
    </div>
  );
}


export default App;
