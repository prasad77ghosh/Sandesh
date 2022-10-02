import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Slices/AuthSlices/registerSlice";
import { useEffect } from "react";

const SignUp = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = React.useState(false);
  const [showC, setShowC] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClickC = () => setShowC(!showC);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(
    (state) => state.signUpReducer
  );

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "dygi8amqn");
      fetch("https://api.cloudinary.com/v1_1/dygi8amqn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords did not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    dispatch(registerUser({ name, email, password, pic }));
    setLoading(false);
    toast({
      title: "Register Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
    <VStack spacing={2}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          borderColor={"whiteAlpha.300"}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          borderColor={"whiteAlpha.300"}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Text fontSize={"13px"} mb="10px">
          Password must contain 8-character atleast 1-capital letter,
          1-specialchar,1-number
        </Text>
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Text fontSize={"13px"} mb="10px">
          Password must contain 8-character atleast 1-capital letter,
          1-specialchar,1-number
        </Text>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showC ? "text" : "password"}
            placeholder="Enter Your Confirm Password"
            borderColor={"whiteAlpha.300"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Box onClick={handleClickC}>
              {showC ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </Box>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={2}
          accept="images/*"
          onChange={(e) => postDetails(e.target.files[0])}
          borderColor={"whiteAlpha.300"}
        />
      </FormControl>

      <Button
        variant="outline"
        colorScheme="telegram"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
