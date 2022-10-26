import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      variant="solid"
      gap="5px"
      fontSize={12}
      bg="tomato"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      <Text>{user.name}</Text>
      <TiDeleteOutline pl={2} size={20} />
    </Box>
  );
};

export default UserBadgeItem;
