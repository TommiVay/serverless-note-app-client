import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/" component={Home} />
      <UnauthenticatedRoute exact path="/login" component={Login} />
      <UnauthenticatedRoute exatc path="/Signup" component={Signup} />
      <AuthenticatedRoute exact path="/settings" component={Settings} />
      <AuthenticatedRoute exact path="/notes/new" component={NewNote} />
      <AuthenticatedRoute exact path="/notes/:id" component={Notes} />
      <Route component={NotFound} />
    </Switch>
  );
}
