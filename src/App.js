import React from "react";
import { Switch, Route} from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Splash from "./components/Splash/Splash";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import {Container} from "reactstrap";

function App() {
  return (
    <Container fluid>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Splash/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </Container>
  );
}

export default App;