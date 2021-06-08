import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import ShowBeach from "./routes/ShowBeach";
import NewBeach from "./routes/NewBeach";
import EditBeach from "./routes/EditBeach";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route exact path="/beaches/:id/edit">
          <EditBeach />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// @TODOS
// Replace simple components with material or react
