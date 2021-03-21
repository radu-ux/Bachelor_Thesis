import React from 'react';
import ReactDOM from 'react-dom';
import "./css/site.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import WorldHappiness from "./components/first-dataset/WorldHappiness";
import { BrowserRouter, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/world-happiness" 
             render={props => <WorldHappiness {...props}/>}
      />
      <Route exact path="/" 
           render={props => <App {...props}/>}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
