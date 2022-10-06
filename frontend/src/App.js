import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Intro from "./pages/Intro";
import LoginAndRegister from "./pages/LoginAndRegister";

const App = () => {
  return (
    <>
      <div className="App">
        <Route path="/" component={Intro} exact/>
        <Route path="/login_register" component={LoginAndRegister} />
        <Route path="/chats" component={Chat} />
      </div>
    </>
  );
};

export default App;
