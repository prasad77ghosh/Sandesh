import React from "react";
import {
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { HiEye } from "react-icons/hi";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display="flex" icon={<HiEye />} onClick={onOpen} />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={["30px", "40px"]}
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              borderRadius="full"
              boxSize={["100px", "150px"]}
              src={user.pic}
              alt={user.name}
            />

            <Text fontSize="2xl" fontWeight="medium" mt="1rem">
             Email:- {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
