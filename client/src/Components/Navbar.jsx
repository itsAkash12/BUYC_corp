import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  VStack,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Here we have used react-icons package for the icons
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Create Post", path: "/create-post" },
  { id: 3, name: "Login", path: "/login" },
];

export default function Navbar() {
  // Imported theme From ThemeContext

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      px={4}
      boxShadow="lg"
      width="100%"
      backgroundColor={"white"}
      color={"black"}
      transition="background 300ms ease-in-out"
      transitionDuration="300ms"
    >
      <Flex
        width={"100%"}
        paddingBlock={2}
        paddingInline={{ base: 1, md: 5 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={8} alignItems="center">
          <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <IconButton
              size="md"
              icon={
                isOpen ? (
                  <AiOutlineClose color={"white"} />
                ) : (
                  <GiHamburgerMenu color={"white"} />
                )
              }
              aria-label="Open Menu"
              display={["inherit", "inherit", "none"]}
              onClick={isOpen ? onClose : onOpen}
              backgroundColor={"#1a202c"}
              _hover={{ background: "#1a202c" }}
            />
            <Link to={"/"}>
              <Image
                src="./BuyCorpPurple.png"
                width={{ base: "120px", md: "150px" }}
                height={"auto"}
              />
            </Link>
          </Flex>
          <HStack
            as="nav"
            spacing={10}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            <Link to={"/create"}>
              <Text
                fontSize={20}
                fontWeight={500}
                marginTop={{ base: 0, md: 2 }}
                color={"gray.600"}
              >
                Dashboard
              </Text>
            </Link>
            <Link to={"/signup"}>
              <Text
                fontSize={20}
                fontWeight={500}
                marginTop={{ base: 0, md: 2 }}
                color={"gray.600"}
              >
                Sign Up
              </Text>
            </Link>
            <Link to={"/login"}>
              <Text
                fontSize={20}
                fontWeight={500}
                marginTop={{ base: 0, md: 2 }}
                color={"gray.600"}
              >
                Login
              </Text>
            </Link>
          </HStack>
        </HStack>

        <Box display={"flex"} gap={3}>
          <Menu isLazy>
            <MenuButton as={Button} size="md" px={0} py={0} rounded="full">
              <Avatar
                size="md"
                name="Avinash Patel"
                rounded="full"
                background={"blackAlpha.800"}
                src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
              />
            </MenuButton>
            <MenuList
              zIndex={5}
              border="2px solid"
              // borderColor={useColorModeValue("gray.700", "gray.100")}
              boxShadow="4px 4px 0"
              background={"white"}
            >
              <Link
                href="https://dev.to/m_ahmad"
                _hover={{ textDecoration: "none" }}
                isExternal
              >
                {/* User Details */}
                <MenuItem background={"white"}>
                  <VStack justify="start" alignItems="left">
                    <Text fontWeight="500">Akash Singh</Text>
                    <Text size="sm" color="gray.500" mt="0 !important">
                      akashviratsingh018@gmail.com
                    </Text>
                  </VStack>
                </MenuItem>
              </Link>
              <MenuDivider />
              {/* Dashboard Button */}
              <MenuItem
                background={"white"}
                _hover={{
                  background: "#1a202c",
                  color: "white",
                }}
                transition="background 200ms ease-in-out"
                transitionDuration="200ms"
              >
                <Text fontWeight="500">Dashboard</Text>
              </MenuItem>
              {/* Create Post Button */}
              <MenuItem
                background={"white"}
                _hover={{
                  background: "#1a202c",
                  color: "white",
                }}
                transition="background 200ms ease-in-out"
                transitionDuration="200ms"
              >
                <Text fontWeight="500">Create Post</Text>
              </MenuItem>
              {/* Setting Button */}
              <MenuItem
                background={"white"}
                _hover={{
                  background: "#1a202c",
                  color: "white",
                }}
                transition="background 200ms ease-in-out"
                transitionDuration="200ms"
              >
                <Text fontWeight="500">Settings</Text>
              </MenuItem>

              <MenuDivider />
              {/* Logout Button */}
              <MenuItem
                background={"white"}
                _hover={{
                  background: "#1a202c",
                  color: "white",
                }}
                transition="background 200ms ease-in-out"
                transitionDuration="200ms"
              >
                <Text fontWeight="500">Sign Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={["inherit", "inherit", "none"]}>
          <Stack as="nav" spacing={2}>
            <Link to={"/create"}>
              <Text>Create</Text>
            </Link>
            <Link to={"/signup"}>
              <Text>SignUp</Text>
            </Link>
            <Link to={"/login"}>
              <Text>Login</Text>
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
