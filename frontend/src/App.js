import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Intro from "./pages/Intro";
import LoginAndRegister from "./pages/LoginAndRegister";

const App = () => {
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element = {<Intro/>}/>
            <Route path="/login_register" element = {<LoginAndRegister/>}/>
            <Route path="/chats" element = {<Chat/>} />
          </Routes>
      </div>
    </>
  );
};

export default App;
