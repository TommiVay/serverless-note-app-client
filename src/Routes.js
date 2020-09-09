import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exatc path="/Signup" component={Signup} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/notes/new" component={NewNote} />
      <Route exact path="/notes/:id" component={Notes} />
      <Route component={NotFound} />
    </Switch>
  );
}
