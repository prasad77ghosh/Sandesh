import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "./MyContext";
import { useNavigate } from "react-router-dom";

const MyProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login_register");
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
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export default MyProvider;
