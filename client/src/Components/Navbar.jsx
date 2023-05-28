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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Here we have used react-icons package for the icons
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRef } from "react";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Create Post", path: "/create-post" },
  { id: 3, name: "Login", path: "/login" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { isLoading, isAuth, token, message, isError } = useSelector(
    (store) => store.auth
  );
  const userObj = JSON.parse(localStorage.getItem("userObj")) || {};
  const logoutHandler = () => {
    localStorage.clear("jwtoken");
    localStorage.clear("userObj");
    window.location.reload(false);
  };

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
            <Link to={"/dashboard"}>
              <Text
                fontSize={20}
                fontWeight={500}
                marginTop={{ base: 0, md: 2 }}
                color={"gray.600"}
              >
                My Dashboard
              </Text>
            </Link>
            <Link to={"/cart"}>
              <Text
                fontSize={20}
                fontWeight={500}
                marginTop={{ base: 0, md: 2 }}
                color={"gray.600"}
              >
                My Cart
              </Text>
            </Link>
            {token ? (
              <Link to={"/car-details"}>
                <Text
                  fontSize={20}
                  fontWeight={500}
                  marginTop={{ base: 0, md: 2 }}
                  color={"gray.600"}
                >
                  Car Details
                </Text>
              </Link>
            ) : (
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
            )}
          </HStack>
        </HStack>

        <Box display={"flex"} gap={3}>
          <Menu isLazy>
            <MenuButton as={Button} size="md" px={0} py={0} rounded="full">
              {userObj ? (
                <Avatar
                  size="md"
                  name={userObj.first_name}
                  rounded="full"
                  background={"blackAlpha.800"}
                  src={userObj.image}
                />
              ) : (
                <Avatar
                  size="md"
                  rounded="full"
                  background={"blackAlpha.800"}
                  src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
                />
              )}
            </MenuButton>
            {userObj.first_name ? (
              <MenuList
                zIndex={5}
                border="2px solid"
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
                      <Text fontWeight="500">{`Welcome, ${userObj.first_name}`}</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        {userObj.email}
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                {/* Dashboard Button */}
                <Link to={"/dashboard"}>
                  {" "}
                  <MenuItem
                    background={"white"}
                    _hover={{
                      background: "#1a202c",
                      color: "white",
                    }}
                    transition="background 200ms ease-in-out"
                    transitionDuration="200ms"
                  >
                    <Text fontWeight="500">My Dashboard</Text>
                  </MenuItem>
                </Link>

                <MenuDivider />
                <Link to={"/car-details"}>
                  <MenuItem
                    background={"white"}
                    _hover={{
                      background: "#1a202c",
                      color: "white",
                    }}
                    transition="background 200ms ease-in-out"
                    transitionDuration="200ms"
                  >
                    <Text fontWeight="500">
                      <Link to={"/car-details"}>Car Details</Link>
                    </Text>
                  </MenuItem>
                </Link>

                <MenuDivider />
                {/* Dashboard Button */}
                <Link to={"/cart"}>
                  {" "}
                  <MenuItem
                    background={"white"}
                    _hover={{
                      background: "#1a202c",
                      color: "white",
                    }}
                    transition="background 200ms ease-in-out"
                    transitionDuration="200ms"
                  >
                    <Text fontWeight="500">My Cart</Text>
                  </MenuItem>
                </Link>

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
                  onClick={onOpen}
                >
                  <Text fontWeight="500">Log Out</Text>
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList
                zIndex={5}
                border="2px solid"
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
                      <Text fontWeight="500">User</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        unknown@email.com
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                {/* Logout Button */}
                <Link to={"/login"}>
                  <MenuItem
                    background={"white"}
                    _hover={{
                      background: "#1a202c",
                      color: "white",
                    }}
                    transition="background 200ms ease-in-out"
                    transitionDuration="200ms"
                  >
                    <Text fontWeight="500">Login</Text>
                  </MenuItem>
                </Link>
              </MenuList>
            )}
          </Menu>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Logout User ?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to SignOut of the Website !
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" ml={3} onClick={logoutHandler}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Flex>
    </Box>
  );
}
