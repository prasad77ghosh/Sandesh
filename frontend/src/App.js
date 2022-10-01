import "./App.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndSign from "./components/LoginAndSignUp";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/login_SignUp" element={<LoginAndSign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
