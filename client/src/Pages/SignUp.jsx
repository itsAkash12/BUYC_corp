import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGmail, SiProgress } from "react-icons/si";
import { RiLockPasswordFill, RiProfileFill } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "../Styles/LoginButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signupAuth } from "../Redux/Actions/Auth.actions";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    password: "",
  });

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
    dispatch(signupAuth(inputValues));
  };
  const { isLoading, isAuth, token, message, isError } = useSelector(
    (store) => store.auth
  );
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
        title: "Registration Success",
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
          //   border={"1px solid black"}
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
          justifyContent={"space-between"}
          gap={20}
        >
          {/* Login Form */}
          <Box width={{ base: "100%", md: "40%" }} padding={{ base: 5, md: 0 }}>
            <Heading as={"h1"} size={"xl"} fontWeight={500}>
              Welcome To BuyCorp :)
            </Heading>

            <Text
              fontSize={30}
              fontWeight={500}
              marginTop={{ base: 0, md: 2 }}
              color={"gray.600"}
            >
              Sign Up
            </Text>

            <Box marginTop={10}>
              {/* Name */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={6}
              >
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <RiProfileFill color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="First Name"
                        variant="filled"
                        required
                        name="first_name"
                        onChange={inputFieldsHandler}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <RiProfileFill color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        variant="filled"
                        required
                        name="last_name"
                        onChange={inputFieldsHandler}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Box>

              {/* Email */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={6}
              >
                <FormControl id="email" isRequired marginTop={2}>
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
                      name="email"
                      onChange={inputFieldsHandler}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="gender" isRequired marginTop={2}>
                  <FormLabel>Gender</FormLabel>
                  <InputGroup>
                    <Select
                      placeholder="Gender"
                      variant="filled"
                      required
                      name="gender"
                      onChange={inputFieldsHandler}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                    <InputRightElement pointerEvents="none">
                      <SiProgress color="gray.300" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>

              {/* Password */}
              <FormControl id="password" isRequired marginTop={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <RiLockPasswordFill color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="filled"
                    required
                    name="password"
                    onChange={inputFieldsHandler}
                  />
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
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    borderRadius={20}
                    colorScheme=""
                    type="submit"
                    className={styles.loginbutton}
                    onClick={getAllFields}
                  >
                    Sign Up
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
                  <Text fontWeight={500}>Already A User?</Text>
                </Box>
                <Box>
                  <Link to={"/login"}>
                    <Text
                      textDecoration={"underline"}
                      color={"blue"}
                      fontWeight={500}
                      cursor={"pointer"}
                    >
                      Login
                    </Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Image */}
          <Box width={"60%"} display={{ base: "none", md: "flex" }}>
            <Image src="./registercar.png" width={"635px"} height={"auto"} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
