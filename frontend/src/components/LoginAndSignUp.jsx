import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Image,
} from "@chakra-ui/react";
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import Logo from "../images/message.png"
const LoginAndSign = () => {
  return (
    <>
      <Container maxW="6xl">
        <Box display="flex" alignItems="center" gap={4} p={4} mt="10px">
          <Image src={Logo} alt="logo image" boxSize="40px" />

          <Text color={"white"} fontSize="2xl">
            Sandesh
          </Text>
        </Box>

        <Container maxW="xl">
          <Box
            bg={"gray.900"}
            w="100%"
            p={4}
            borderRadius="lg"
            color={"white"}
            mt="2rem"
          >
            <Tabs isFitted variant="enclosed" borderColor={"whiteAlpha.300"}>
              <TabList mb="1em">
                <Tab fontSize={"xl"}>Login</Tab>
                <Tab fontSize={"xl"}>SignUp</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default LoginAndSign;
