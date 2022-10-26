import {
  Box,
  Text,
  IconButton,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { BiArrowBack } from "react-icons/bi";
import { getSender, getSenderFull } from "../../logics/ChatLogic";
import Profile from "./Profile";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3300";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    useContext(MyContext);
  const m_user = user.user;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", m_user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/message/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);
      socket.emit("join_chat", selectedChat._id);
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
      setLoading(false);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop_typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage("");
        socket.emit("new_message", data);
        setMessages([...messages, data]);
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
    }
  };

  // for button click
  const sendMessageByBtnClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );
      setNewMessage("");
      setMessages([...messages, data]);
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

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && typing) {
        socket.emit("stop_typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  //received message
  useEffect(() => {
    socket.on("message_received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            color="#efefef"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<BiArrowBack />}
              onClick={() => setSelectedChat("")}
              bg="#CBD5E0"
              color="black"
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(m_user, selectedChat.users)}
                <Profile user={getSenderFull(m_user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModel
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                }
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#2D3748"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Spinner size="xl" />
              </Box>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} isTyping={isTyping} />
              </div>
            )}
          </Box>
          <FormControl
            onKeyDown={sendMessage}
            isRequired
            mt={3}
            display="flex"
            gap={3}
          >
            {/* {isTyping ? <div>Loading...</div> : <></>} */}
            <Input
              variant="filled"
              placeholder="Enter a message.."
              onChange={typingHandler}
              value={newMessage}
              bg="#2D3748"
              color="#efefef"
            />

            <IconButton
              icon={<IoMdSend size={20} />}
              width="4rem"
              onClick={sendMessageByBtnClick}
              bg="#A0AEC0"
            />
          </FormControl>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} color="#efefef">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
