import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./routes/MainPage";
import ShowBeach from "./routes/ShowBeach";
import NewBeach from "./routes/NewBeach";
import EditBeach from "./routes/EditBeach";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/BeachCard";
import "./App.css";

const MainContainer = styled.div`
  margin-bottom: 60px;
`;

function App() {
  return (
    <Router>
      <MainContainer>
      <Header />
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
      <Card/>
      <Footer />
      </MainContainer>
    </Router>
  );
}

export default App;

// @TODOS
// Replace simple components with material or react
