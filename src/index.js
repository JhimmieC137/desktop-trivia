import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Route } from "react-router";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "./assets/scss/index.scss";

//pages
import Index from './views/index';





const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
  <Switch>
    <Route path="/" render={(props) => <Index {...props} />} />
    <Redirect to="/" />
  </Switch>
</BrowserRouter>
);