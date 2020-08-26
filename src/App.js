import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import TodoList from "./components/TodoList";
import "./components/index.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route
            exact
            path="/reset-password/:token"
            component={ResetPassword}
          />
          <Route exact path="/todos" component={TodoList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
