import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './components/ChatApp/VideoCallFeature/Context';
import './style.css'
ReactDOM.render(
  <BrowserRouter>
  <>
    <App />
  </>
  </BrowserRouter>
    ,
 
  document.getElementById('root')
);

