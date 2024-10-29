import React from 'react';
import logo from './logo.svg';
import './App.css';

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
    <div className="container">
      <h1 className = "test">Hello, {
      name === "리액트" ? (<h1>YES</h1>) : (<h1>NO</h1>)
      }!</h1>
      <p style = {style}>반갑습니다.</p>
    </div>
  );
}


export default App;
