import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Image, Text, VStack, Button } from "@chakra-ui/react";
import Logo from "../images/message.png";
const Intro = () => {
  return (
    <>
      <Container maxW="4xl" height="100vh" centerContent>
        <VStack spacing={4}>
          <Box
            mt={["10rem", "7rem"]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text
              fontSize={["4xl", "6xl"]}
              fontWeight="bold"
              letterSpacing="wider"
              color={"white"}
            >
              Welcome To
            </Text>
            <Box
              display="flex"
              alignItems="center"
              gap={5}
              mt={["1rem", "2rem"]}
            >
              <Image src={Logo} alt="logo" width={["60px", "100px"]} />
              <Text
                fontSize={["3xl", "5xl"]}
                fontWeight="bold"
                color={"white"}
                letterSpacing="wide"
              >
                Sandesh
              </Text>
            </Box>
            <Box mt={["3rem", "4rem"]}>
              <Link to="login_register">
                <Button
                  size="md"
                  height={["40px", "45px"]}
                  width={["140px", "180px"]}
                  fontSize={["15px", "xl"]}
                  variant="solid"
                  colorScheme="blue"
                >
                  Start Messaging
                </Button>
              </Link>
            </Box>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Intro;
