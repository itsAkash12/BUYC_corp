import { useEffect, useState } from "react";
import { Box, Button, Center, Grid, Heading, Image, Text, useToast } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/LoginButton.module.css";
import { useNavigate } from "react-router-dom";
import SingleDetails from "./SingleDetails";
import Loader from "../Components/Loader";

function Homepage() {
  const toast = useToast();
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const history = unstable_HistoryRouter();

  useEffect(() => {
    // Fetch car data from the API endpoint
    const fetchCarData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/cars`);
        if (response.ok) {
          const data = await response.json();
          setCarData(data.data);
          // console.log(data)
          setLoading(false);
        } else {
          console.error("Failed to fetch car data.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error while fetching car data:", error);
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);
  const handleCarClick = (car) => {
    localStorage.setItem("car-details", JSON.stringify(car));
    navigate("/single-details");
  };
  const addToCart = async (id) => {
    const payload = {
      MarketplaceInventoryID: id,
    };
    // console.log(payload)
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    try {
      let res = await fetch(`${process.env.REACT_APP_BASEURL}/carts`, {
        method:"POST",
        headers:{
          authorization:token,
          "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
      })
      let result = await res.json()
      if(result.status == "success"){
        toast({
          title: "Success",
          description: "Added to Cart Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }else{
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
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  if(loading){
    return(
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Loader></Loader>
      </Box>
    )
  }
  return (
    <Box>
      <Navbar></Navbar>
      <Box p={4}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {carData &&
            carData.map((car) => (
              <Box
                key={car.id}
                p={4}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                textAlign="center"
                
              >
                <Image src={car.image} alt={car.title} mb={4} onClick={() => handleCarClick(car)} />
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {car.title}
                </Text>
                <Button colorScheme="" size="sm" className={styles.loginbutton} onClick={()=>addToCart(car._id)}>
                  Add to Cart
                </Button>
              </Box>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Homepage;
