import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./routes/MainPage";
import ShowBeach from "./routes/ShowBeach";
import NewBeach from "./routes/NewBeach";
import EditBeach from "./routes/EditBeach";
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
            <NewBeach />
          </Route>
          <Route exact path="/beaches/:id">
            <ShowBeach />
          </Route>
          <Route exact path="/beaches/:id/edit">
            <EditBeach />
          </Route>
        </Switch>
      </MainContainer>
    </Router>
  );
}

export default App;

// @TODOS
// Replace simple components with material or react
// Add scroll to top button after specific point
// Fix padding in beaches screen
// Show page typography fluid
