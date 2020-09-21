import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
