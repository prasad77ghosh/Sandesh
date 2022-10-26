import React, { useEffect } from "react";
import MyContext from "../../Context/MyContext";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { R_Token, setR_Token } = useContext(MyContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [showC, setShowC] = React.useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = () => setShow(!show);
  const handleClickC = () => setShowC(!showC);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    setR_Token(params.token);
  }, [params]);

  const resetPasswordhandler = async () => {
    setLoading(true);
    if (!password || !confirmPassword) {
      toast({
        title: "Please Fill all the fileds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/user/password/reset/${params.token}`,
        { password },
        config
      );
      console.log(data);
      toast({
        title: "Your password Changed Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setR_Token("");
      navigate("/chats");
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

  return (
    <Box
      color="#efefef"
      bg="gray.900"
      height="300px"
      py={5}
      px={8}
      margin="0 auto"
      mt="6rem"
      borderRadius="10px"
    >
      <FormControl id="Resetpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <Text fontSize={"13px"} mb="10px">
          Password (must contain 1-Capital, 1-Number, 1-Special Char)
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
      <FormControl id="Reset-confirm-password" isRequired mt={4}>
        <FormLabel>Confirm Password</FormLabel>
        <Text fontSize={"13px"} mb="10px"></Text>
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

      <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
        <Button
          colorScheme="blue"
          variant="link"
          onClick={resetPasswordhandler}
          isLoading={loading}
        >
          Change Your Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
