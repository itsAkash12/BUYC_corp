import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/LoginButton.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function Dashboard() {
  const toast = useToast();
  const [carData, setCarData] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedCar, setEditedCar] = useState({});
  const [editedField, setEditedField] = useState("");
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car data from the API endpoint
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    const fetchCarData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/cars/me`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setCarData(data.data);
          console.log(data);
          setFlag(true);
          setLoading(false);
        } else {
          console.error("Failed to fetch car data.");
          setFlag(false);
          setLoading(false);
        }
      } catch (error) {
        setFlag(false);
        console.error("Error while fetching car data:", error);
        setLoading(false);
      }
    };

    fetchCarData();
  }, [render]);

  const handleCarClick = (car) => {
    localStorage.setItem("car-details", JSON.stringify(car));
    navigate("/single-details");
  };

  const handleEdit = (car, field) => {
    setEditedCar(car);
    setEditedField(field);
    onOpen();
  };

  const handleSaveChanges = async () => {
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASEURL}/cars/me/${editedCar._id}`,
        {
          method: "PATCH",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCar),
        }
      );
      let result = await res.json();
      if (result.status == "success") {
        toast({
          title: "Success",
          description: "Car Data Updated Successfully",
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
        description: "Error While Updating Car Data",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    // console.log(editedCar)
    setRender(true);
    onClose();
  };

  const handleDelete = async (car) => {
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASEURL}/cars/me/${car._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      let result = await res.json();
      if (result.status == "success") {
        toast({
          title: "Success",
          description: "Car Data Deleted Successfully",
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
    // console.log(editedCar)
    setRender(true);
  };
  if (loading) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Loader></Loader>
      </Box>
    );
  }
  return (
    <Box>
      <Navbar></Navbar>
      {flag ? (
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
                  <Image
                    src={car.image}
                    alt={car.title}
                    mb={4}
                    onClick={() => handleCarClick(car)}
                  />
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {car.title}
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEdit(car, "edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(car)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Center>
            <Heading>Dealer Should Able to See their Added Cars !</Heading>
          </Center>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Car</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={editedCar.title || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={editedCar.description || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Kilometers on Odometer</FormLabel>
              <Input
                value={editedCar.kilometersOnOdometer || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    kilometersOnOdometer: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Major Scratches</FormLabel>
              <Input
                value={editedCar.majorScratches || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    majorScratches: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Original Paint</FormLabel>
              <Input
                value={editedCar.originalPaint || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    originalPaint: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Accidents Reported</FormLabel>
              <Input
                value={editedCar.accidentsReported || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    accidentsReported: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Previous Buyers</FormLabel>
              <Input
                value={editedCar.previousBuyers || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    previousBuyers: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Registration Place</FormLabel>
              <Input
                value={editedCar.registrationPlace || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    registrationPlace: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Model</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.Model || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    model: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Year</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.Year || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>List Price</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.ListPrice || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    listPrice: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Colors</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.Colors.join(", ") || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    colors: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Mileage</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.Mileage || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    mileage: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Power</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.Power || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    power: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Max Speed</FormLabel>
              <Input
                value={editedCar.OEM_SpecsID?.MaxSpeed || ""}
                onChange={(e) =>
                  setEditedCar((prev) => ({
                    ...prev,
                    maxSpeed: e.target.value,
                  }))
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Dashboard;
