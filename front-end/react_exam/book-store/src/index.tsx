import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// if(process.env.NODE_ENV === 'development') {
//   const {worker} = require("./mock/browser");
//   worker.start(); // msw 시작
// }



async function mountApp() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
}

mountApp();