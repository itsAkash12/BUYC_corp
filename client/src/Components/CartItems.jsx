import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
// import RemoveItemAlert from "./RemoveItemAlert";

const CartItems = ({ MarketplaceInventoryID, _id, render, setRender }) => {
  const toast = useToast();
  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    try {
      let res = await fetch(`${process.env.REACT_APP_BASEURL}/carts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (result.status == "success") {
        toast({
          title: "Success",
          description: "Cart Item Removed Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Success",
        description: "Error While Deleting Car Data",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setRender(true);
  };
  return (
    <>
      <Box w="100%" borderWidth="1px" minH="100px" mb="10px">
        <Box
          w="100%"
          p="20px"
          borderBottomWidth="1px"
          minH="100px"
          display={"grid"}
          gridTemplateColumns={"1fr 3fr"}
          gap={"10px"}
        >
          <Box>
            <Image src={MarketplaceInventoryID?.image} w="100%" maxH={"80px"} />
          </Box>
          <Box>
            <Box
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              mb="10px"
            >
              <Box w="80%">
                <Text fontWeight={"bold"} noOfLines={1} fontSize={"17px"}>
                  {MarketplaceInventoryID?.title}
                </Text>
              </Box>
              <Box
                color={"#008060"}
                fontSize={"18px"}
                fontWeight={"bold"}
                w="20%"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              ></Box>
            </Box>

            <Box
              // border={"1px solid red"}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              mb="10px"
            >
              <Text fontSize={"20px"} mr="20px">
                Model: {MarketplaceInventoryID?.OEM_SpecsID?.Model}
              </Text>
              <Text fontSize={"20px"}>
                Year: {MarketplaceInventoryID?.OEM_SpecsID?.Year}
              </Text>
            </Box>
            <Box mb="10px">
              <Text fontSize={"20px"}>
                Price: {MarketplaceInventoryID?.OEM_SpecsID?.ListPrice}
              </Text>
            </Box>
          </Box>
          <Button onClick={() => handleDelete(_id)}>Delete</Button>
        </Box>
      </Box>
    </>
  );
};
export default CartItems;
