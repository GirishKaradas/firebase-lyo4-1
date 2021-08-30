  
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './components/ChatApp/VideoCallFeature/Context';
import './style.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper } from '@material-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

ReactDOM.render(
  <BrowserRouter>
  <Paper>
     <App />
  </Paper>
   
  </BrowserRouter>
    ,
  document.getElementById('root')
);