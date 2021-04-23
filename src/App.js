import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Splash from "./components/Splash/Splash";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import {Container} from "reactstrap";
import {useHistory} from "react-router-dom";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setSessionToken(sessionStorage.getItem("token"));
    }
  }, []);

  const updateToken = (token) => {
    setSessionToken(token);
    sessionStorage.setItem("token", token);
  };


  const logout = () => {
    setSessionToken("");
    sessionStorage.removeItem("token");
    history.push("/");
  };

  return (
      <Container fluid>
        <Header token={sessionToken} logout={logout} />
        <Switch>
          <Route exact path="/">
            <Splash token={sessionToken} />
          </Route>
          <Route path="/signup">
            <Signup updateToken={updateToken}/>
          </Route>
          <Route path="/login">
            <Login updateToken={updateToken}/>
          </Route>
        </Switch>
        <Footer />
      </Container>
  );
}

export default App;