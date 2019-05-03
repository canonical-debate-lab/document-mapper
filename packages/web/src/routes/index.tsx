import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { Layout } from "../components/Layout";
import history from "../utils/history";
import Login from "../pages/login";
import Home from "../pages/home";

import LogoIcon from "../assets/images/logo.png";

const privateRoute = [
  {
    path: "/",
    name: "Home",
    img: LogoIcon
  }
];

const RestrictedArea = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  );
};

const Routes = () => (
  <Router history={history}>
    <Layout routes={privateRoute}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={() => RestrictedArea()} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
