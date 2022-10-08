import { Box } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import MyContext from "../../Context/MyContext";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat } = useContext(MyContext);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAngain={fetchAgain} setFetchAngain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
