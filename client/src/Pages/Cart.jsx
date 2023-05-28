import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
// import PriceDetails from "../components/Cart/PriceDetails";
import CartItems from "../Components/CartItems";
import { useSelector } from "react-redux";

const Cart = () => {
  const [carData, setcarData] = useState([]);
  const [count, setCount] = useState(0);
  const [render, setRender] = useState(false);
  const getData = async () => {
    const token = JSON.parse(localStorage.getItem("jwtoken"));

    try {
      let res = await fetch(`${process.env.REACT_APP_BASEURL}/carts`, {
        headers: {
            authorization:token
        },
      })
      let result = await res.json();
      console.log(result.data);
      setCount(result.length);
      setcarData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [render]);
  return (
    <>
      <Navbar />
      {
        carData && carData.length > 0 ? <Box w="100%" minHeight={"120vh"} display="flex" flexDirection={"column"}>
        <Box p={{ base: "40px 10px", sm: "40px 50px" }} mb="40px">
          <Box
            w={{ base: "100%", md: "80%", lg: "70%" }}
            m="0 auto"
            display={"grid"}
            gridTemplateColumns={{ base: "1fr", md: "1.8fr 1fr" }}
          >
            <Box
              borderRightWidth={{ base: "0px", md: "1px" }}
              minH="400px"
              p={"0px 20px"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                mb="20px"
              >
                <Box pr="15px" borderRight={"1px solid black"}>
                  <Text
                    fontSize={"22px"}
                    color={"#333333"}
                    fontWeight={"bolder"}
                  >
                    Cart
                  </Text>
                </Box>
                <Box ml="15px">
                  <Text fontSize={"22px"}>{count} Item</Text>
                </Box>
              </Box>

              <Box>
                {carData.map((ele) => {
                  return <CartItems key={ele._id} {...ele} render={render} setRender={setRender} />;
                })}
              </Box>
            </Box>

            <Box
              h={{ base: "100%", md: "400px" }}
              p={{ base: "0px", md: "0px 20px" }}
              position={"relative"}
              mt={{ base: "30px", md: "0px" }}
            >
              {/* <PriceDetails /> */}
            </Box>
          </Box>
        </Box>
      </Box>:<Box><Center><Heading>No Order Found in Your Cart</Heading></Center></Box>
      }
    </>
  );
};

export default Cart