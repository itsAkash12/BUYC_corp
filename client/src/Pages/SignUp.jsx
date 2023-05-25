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
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { SiGmail } from "react-icons/si";
  import { RiLockPasswordFill, RiProfileFill } from "react-icons/ri";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import styles from "../Styles/LoginButton.module.css";
  
  const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
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
            <Box
              width={{ base: "100%", md: "40%" }}
              padding={{ base: 5, md: 0 }}
            >
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
                        />
                      </InputGroup>
                    </FormControl>
                  </Box>
                </Box>
  
                {/* Email */}
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
                    />
                  </InputGroup>
                </FormControl>
  
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
                  <button className={styles.loginbutton}>Sign Up</button>
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