import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Slices/loginSlices";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.loginReducer);
  const submitHandler = () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    dispatch(loginUser({ email, password }));
    setLoading(false);
    toast({
      title: "Login Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }

    if (isAuthenticated) {
      navigate("/chats");
      setLoading(false);
    }
  }, [error, toast, setLoading, isAuthenticated, navigate]);

  return (
    <VStack spacing={4}>
      <FormControl id="loginEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          borderColor={"whiteAlpha.300"}
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            borderColor={"whiteAlpha.300"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Box onClick={handleClick}>
              {show ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </Box>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        variant="outline"
        colorScheme="telegram"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="outline"
        colorScheme="orange"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guestuser@gmail.com");
          setPassword("guest@8989");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
