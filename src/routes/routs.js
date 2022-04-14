import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import StartPage from "../pages/StartPage";
import Search from "../pages/Search";
import GameInfo from "../pages/GameInfo";
import MyList from "../pages/MyList";
import Aside from "../components/Aside";
export const userRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main">
          <Aside></Aside>
          <StartPage></StartPage>
        </Route>
        <Route path="/search">
          <Aside></Aside>
          <Search></Search>
        </Route>
        <Route path="/game/:name">
          <GameInfo></GameInfo>
        </Route>
        <Route path="/list">
          <Aside></Aside>
          <MyList></MyList>
        </Route>
        <Redirect to="/main"></Redirect>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
};
