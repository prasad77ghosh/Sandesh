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

const MyChats = ({ fetchAgain }) => {
  // const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useContext(MyContext);

  const m_user = user.user;
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
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        w={{ base: "100%", md: "40%", lg: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        bg="#171923"
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
          <Text fontSize={{ base: "xl", md: "xl", lg: "2xl" }} color="#efefef">
            My Chats
          </Text>
          <GroupChatModel>
            <Button
              display="flex"
              gap={2}
              fontSize={{ base: "15px", md: "10px", lg: "17px" }}
              rightIcon={<MdGroupAdd size={25} />}
              bg="#CBD5E0"
            >
              New Group Chat
            </Button>
          </GroupChatModel>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          p={3}
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          bg="#2D3748"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#A0AEC0"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(m_user, chat?.users)
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
