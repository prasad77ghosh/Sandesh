import React from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "../Components/chatComp/NavBar";
import MyChats from "../Components/chatComp/MyChats";
import ChatBox from "../Components/chatComp/ChatBox";
import { ChatState } from "../Context/ChatProvider";
const Chat = () => {
  const { user } = ChatState();

  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <NavBar user={user} />}
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          height="91.5vh"
          p="10px"
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </div>
    </>
  );
};

export default Chat;
