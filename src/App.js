import React, {useEffect, useState} from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Splash from "./components/Splash/Splash"
import Footer from "./components/Footer/Footer";
import {Container} from "reactstrap";


function App() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setToken(localStorage.getItem("token")) : setToken(false);
  }, [])

  const updateToken = (token) => {
    setToken(token);
  }

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(false);
  }

  return (
    <Container fluid>
      <Header updateToken={updateToken} logout={clearToken}/>
      <Splash />
      <Footer />
    </Container>
  );
}

export default App;
