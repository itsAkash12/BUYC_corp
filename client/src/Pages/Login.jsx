import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "../Styles/LoginButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginAuth } from "../Redux/Actions/Auth.actions";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const { isLoading, isAuth, token, message, isError } = useSelector(
    (store) => store.auth
  );

  const inputFieldsHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValues({ ...inputValues, [name]: value });
  };
  const getAllFields = () => {
    if (
      inputValues.first_name == "" ||
      inputValues.last_name == "" ||
      inputValues.email == "" ||
      inputValues.gender == "" ||
      inputValues.password == ""
    ) {
      toast({
        title: "Error",
        description: "Please Fill all the necessary Credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch(loginAuth(inputValues));
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
    if (isError) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearErrors());
    }
    if (isAuth) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearErrors());
    }
  }, [isAuth, isError]);
  return (
    <>
      {/* Main Box */}
      <Box minHeight={"100vh"} width={"100%"}>
        {/* Logo */}
        <Box
          paddingLeft={{ base: 3, md: 40 }}
          paddingTop={{ base: 3, md: 5 }}
          width={{ base: "130px", md: "320px" }}
        >
          <Link to={"/"}>
            <Image
              src="./BuyCorpPurple.png"
              width={{ base: "120px", md: "150px" }}
              height={"auto"}
            />
          </Link>
        </Box>

        <Box
          width={"100%"}
          paddingInline={{ base: 3, md: 40 }}
          paddingTop={{ base: 3, md: 5 }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* Image */}
          <Box flex={1} display={{ base: "none", md: "flex" }}>
            <Image src="./logincar.png" width={"635px"} height={"auto"} />
          </Box>

          {/* Login Form */}
          <Box>
            <Heading
              as={"h1"}
              size={"2xl"}
              fontWeight={500}
              padding={{ base: 5, md: 0 }}
            >
              Welcome Back :)
            </Heading>

            <Text
              fontSize={30}
              fontWeight={500}
              marginTop={{ base: 0, md: 2 }}
              color={"gray.600"}
            >
              Login to your account
            </Text>

            <Box marginTop={10}>
              {/* Email */}
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SiGmail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email"
                    variant="filled"
                    required
                    name={"email"} onChange={inputFieldsHandler}
                  />
                </InputGroup>
              </FormControl>

              {/* Password */}
              <FormControl id="password" isRequired marginTop={1}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <RiLockPasswordFill color="gray.300" />
                  </InputLeftElement>
                  <Input type={showPassword ? "text" : "password"} variant={"filled"} placeholder="Password" name={"password"} onChange={inputFieldsHandler} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Remember me And Froget Button */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginTop={4}
              >
                <Box>
                  <Checkbox>Remember Me</Checkbox>
                </Box>
                <Box>
                  <Text cursor={"pointer"} _hover={{ color: "blue" }}>
                    Forgot Password?
                  </Text>
                </Box>
              </Box>

              {/* Sign in Button And Create Account Button */}
              <Box width={"100%"} marginTop={7}>
              {isLoading ? (
                  <Button
                    isLoading
                    borderRadius={20}
                    colorScheme=""
                    type="submit"
                    className={styles.loginbutton}
                    onClick={getAllFields}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    borderRadius={20}
                    colorScheme=""
                    type="submit"
                    className={styles.loginbutton}
                    onClick={getAllFields}
                  >
                    Login
                  </Button>
                )}
              </Box>

              {/* Create Account Button */}
              <Box
                width={"100%"}
                marginTop={5}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Box>
                  <Text fontWeight={500}>New User?</Text>
                </Box>
                <Box>
                  <Link to={"/signup"}>
                    <Text
                      textDecoration={"underline"}
                      color={"blue"}
                      fontWeight={500}
                      cursor={"pointer"}
                    >
                      Create Account
                    </Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
