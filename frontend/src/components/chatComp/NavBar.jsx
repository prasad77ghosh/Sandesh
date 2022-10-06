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

import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../images/message.png";
import Profile from "./Profile";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoader from "./ChatLoader";
import UserListItem from "../UserComp/UserListItem";
const NavBar = ({ user }) => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/login_register");
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

  const accessChat = (userId) => {
    
  };

  return (
    <>
      <Box
        bg="white"
        p="3px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <BsSearch size="18" />
            <Text display={["none", "flex"]} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Box display="flex" alignItems="center" gap="3">
          <Image src={Logo} alt="logo" width={["25px", "30px"]} />
          <Text fontSize={["xl", "2xl"]} fontWeight="medium">
            Sandesh
          </Text>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Menu>
            <MenuButton p={1}>
              <IoIosNotifications size={22} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown />}>
              <Avatar size={"sm"} name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
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
