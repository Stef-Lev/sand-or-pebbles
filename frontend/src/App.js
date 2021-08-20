import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./routes/MainPage";
import ShowBeach from "./routes/ShowBeach";
import EditBeach from "./routes/EditBeach";
import ErrorPage from "./routes/ErrorPage";
import Header from "./components/Header";
import "./App.css";

const MainContainer = styled.div`
  padding: 16px;
`;

function App() {
  return (
    <Router>
      <Header />
      <MainContainer>
        <Switch>
          <Route exact path="/beaches">
            <MainPage />
          </Route>
          <Route exact path="/beaches/new">
            <EditBeach />
          </Route>
          <Route exact path="/beaches/:id">
            <ShowBeach />
          </Route>
          <Route exact path="/beaches/:id/edit">
            <EditBeach />
          </Route>
          <Route exact path="error/:status/:message">
            <ErrorPage />
          </Route>
          <Route>
            <ErrorPage status={500} message='Something went wrong' />
          </Route>
        </Switch>
      </MainContainer>
    </Router>
  );
}

export default App;

// @TODOS
// Replace simple components with material or react
// Add scroll to top button after specific point and functionality
// Fix padding in beaches screen
// Show page typography fluid
// Add sand or pebble logo
// field with sand or pebble
// handle all errors FE and BE
