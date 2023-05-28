import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";

function SingleDetails() {
  const car = JSON.parse(localStorage.getItem("car-details"));
  console.log(car);
  return (
    <Box>
      <Navbar></Navbar>
      <Box p={4}>
        <VStack spacing={4} alignItems="start">
          <Image src={car.image} alt={car.title} maxW="500px" />
          <Heading as="h2" size="lg">
            {car.title}
          </Heading>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Model</Td>
                <Td>{car.OEM_SpecsID?.Model}</Td>
              </Tr>
              <Tr>
                <Td>Year</Td>
                <Td>{car.OEM_SpecsID?.Year}</Td>
              </Tr>
              <Tr>
                <Td>List Price</Td>
                <Td>{car.OEM_SpecsID?.ListPrice}</Td>
              </Tr>
              <Tr>
                <Td>Colors</Td>
                <Td>{car.OEM_SpecsID?.Colors.join(", ")}</Td>
              </Tr>
              <Tr>
                <Td>Mileage</Td>
                <Td>{car.OEM_SpecsID?.Mileage}</Td>
              </Tr>
              <Tr>
                <Td>Power</Td>
                <Td>{car.OEM_SpecsID?.Power}</Td>
              </Tr>
              <Tr>
                <Td>Max Speed</Td>
                <Td>{car.OEM_SpecsID?.MaxSpeed}</Td>
              </Tr>

              <Tr>
                <Td>Title</Td>
                <Td>{car.title}</Td>
              </Tr>
              <Tr>
                <Td>Description</Td>
                <Td>{car.description.join(",")}</Td>
              </Tr>
              <Tr>
                <Td>Kilometers on Odometer</Td>
                <Td>{car.kilometersOnOdometer}</Td>
              </Tr>
              <Tr>
                <Td>Major Scratches</Td>
                <Td>{car.majorScratches}</Td>
              </Tr>
              <Tr>
                <Td>Original Paint</Td>
                <Td>{car.originalPaint ? "Yes" : "No"}</Td>
              </Tr>
              <Tr>
                <Td>Accidents Reported</Td>
                <Td>{car.accidentsReported}</Td>
              </Tr>
              <Tr>
                <Td>Previous Buyers</Td>
                <Td>{car.previousBuyers}</Td>
              </Tr>
              <Tr>
                <Td>Registration Place</Td>
                <Td>{car.registrationPlace}</Td>
              </Tr>
            </Tbody>
          </Table>

          <Button colorScheme="blue" size="md">
            Add to Cart
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default SingleDetails;
