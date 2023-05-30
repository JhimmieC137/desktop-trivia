import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Route } from "react-router";
import { HashRouter, BrowserRouter, Routes, Route, Redirect, Switch } from "react-router-dom";

// styles
import "./assets/scss/index.scss";

//pages
import Index from './views/index';
import QuizView from './views/QuizView';
import AuthView from './views/AuthView';
import HomeView from './views/HomeView';
import DifficultyView from './views/DifficultyView';





const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <HashRouter>
    <div>
      <Route exact path="/"  component={HomeView}/>
      <Route exact path="/levels"  component={DifficultyView}/>
      <Route exact path="/auth"  component={AuthView}/>
      <Route exact path="/home"  component={Index}/>
      <Route path="/quiz" component={QuizView}/>
    </div>
</HashRouter>
);