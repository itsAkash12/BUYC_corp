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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "../Styles/LoginButton.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
                  <Input type={showPassword ? "text" : "password"} />
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
                    Forget Password?
                  </Text>
                </Box>
              </Box>

              {/* Sign in Button And Create Account Button */}
              <Box width={"100%"} marginTop={7}>
                <button className={styles.loginbutton}>Login</button>
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
                  <Link to={"/sign-up"}>
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
