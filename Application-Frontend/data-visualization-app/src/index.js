import React from 'react';
import ReactDOM from 'react-dom';
import "./css/site.css";
import App from './components/index-page/App';
import WorldHappiness from "./components/first-dataset/world-happiness/WorldHappiness";
import COVID19Vaccine from './components/first-dataset/covid19/COVID19Vaccine';
import COVID19CasesAmerica from './components/first-dataset/covid19/COVID19CasesAmerica';
import COVID19WorldRestrictions from './components/first-dataset/covid19/COVID19WorldRestrictions';
import { BrowserRouter, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/world-happiness" 
             render={props => <WorldHappiness {...props}/>}
      />
      <Route exact path="/covid-19-vaccine" 
             render={props => <COVID19Vaccine {...props}/>}
      />
      <Route exact path="/covid-19-cases-america" 
             render={props => <COVID19CasesAmerica {...props}/>}
      />
      <Route exact path="/covid-19-world-restrictions" 
             render={props => <COVID19WorldRestrictions {...props}/>}
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
