import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import ShowBeach from "./routes/ShowBeach";
import NewBeach from "./routes/NewBeach";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/beaches">
          <MainPage />
        </Route>
        <Route exact path="/beaches/new">
          <NewBeach />
        </Route>
        <Route exact path="/beaches/:id">
          <ShowBeach />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// @TODOS
// Replace simple components with material or react
