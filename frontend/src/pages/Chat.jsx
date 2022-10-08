import { Box } from "@chakra-ui/react";
import NavBar from "../Components/chatComp/NavBar";
import MyChats from "../Components/chatComp/MyChats";
import ChatBox from "../Components/chatComp/ChatBox";
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import { useState } from "react";
const Chat = () => {
  const { user } = useContext(MyContext);
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <NavBar />}
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          height="91.5vh"
          p="10px"
        >
          {user && (
            <MyChats
              fetchAngain={fetchAgain}
            />
          )}
          {user && (
            <ChatBox
              fetchAngain={fetchAgain}
              setFetchAngain={setFetchAgain}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default Chat;
