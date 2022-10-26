import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MyContext from "./MyContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MyProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  // const [isToken, setIsToken] = useState(false);
  const [R_Token, setR_Token] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login_register");
    }
    if (!userInfo && R_Token) {
      navigate(`reset/password/${R_Token}`);
    }
    setUser(userInfo);
  }, [navigate]);

  return (
    <>
      <MyContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          notification,
          setNotification,
          R_Token,
          setR_Token,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export default MyProvider;
