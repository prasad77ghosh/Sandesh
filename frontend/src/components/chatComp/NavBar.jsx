import {
  Box,
  Button,
  Tooltip,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { useContext, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../images/message.png";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoader from "./ChatLoader";
import UserListItem from "../UserComp/UserListItem";
import MyContext from "../../Context/MyContext";
import { Spinner } from "@chakra-ui/react";
import { getSender } from "../../logics/ChatLogic";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
const NavBar = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = useContext(MyContext);

  const m_user = user.user;
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login_register");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user?search=${search}`);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the search results",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
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

  return (
    <>
      <Box
        bg="#171923"
        p="3px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        borderWidth="1px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen} bg="#A0AEC0">
            <BsSearch size="22" />
          </Button>
        </Tooltip>

        <Box display="flex" alignItems="center" gap="3">
          <Image src={Logo} alt="logo" width={["25px", "30px"]} />
          <Text fontSize={["xl", "2xl"]} fontWeight="medium" color="#efefef">
            Sandesh
          </Text>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <IoIosNotifications size={25} color="#CBD5E0" />
            </MenuButton>
            <MenuList pl={3}>
              {!notification.length && "No new messages."}
              {notification.map((notfi) => (
                <MenuItem
                  key={notfi._id}
                  onClick={() => {
                    setSelectedChat(notfi.chat);
                    setNotification(notification.filter((n) => n !== notfi));
                  }}
                >
                  {notfi.chat.isGroupChat
                    ? `New Message in ${notfi.chat.chatName}`
                    : `New Message from ${getSender(m_user, notfi.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown />} bg="#A0AEC0">
              <Avatar
                size={"sm"}
                name={user && m_user.name}
                src={user && m_user.pic}
              />
            </MenuButton>
            <MenuList>
              {user && (
                <Profile user={m_user}>
                  <MenuItem>My Profile</MenuItem>
                </Profile>
              )}
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoader />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleUserFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {loadingChat && <Spinner size="xl" ml="auto" display="flex" />}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
