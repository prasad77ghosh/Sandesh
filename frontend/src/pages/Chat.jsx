import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/login_SignUp");
    }
  }, [navigate]);

  return(
    <>
    <div style={{width:"100%"}}>
      {/* {user && <SideDrawer/>} */}
      <Box>
        {/* {user && <MyChats/>} */}
        {/* {user && <ChatBox/>} */}
      </Box>
    </div>
    </>
  )
};

export default Chat;
