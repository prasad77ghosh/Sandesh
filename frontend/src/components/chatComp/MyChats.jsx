import React, { useState } from "react";
import { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { MdGroupAdd } from "react-icons/md";
import ChatLoader from "./ChatLoader";
import { getSender } from "../../logics/ChatLogic";
import GroupChatModel from "./GroupChatModel";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats }  = useContext(MyContext);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/v1/chat");
      setChats(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <GroupChatModel>
            <Button
              display="flex"
              gap={2}
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<MdGroupAdd size={25} />}
            >
              New Group Chat
            </Button>
          </GroupChatModel>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat?.users)
                      : chat?.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoader />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
