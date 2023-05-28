import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import styles from "../Styles/LoginButton.module.css";
import Navbar from "../Components/Navbar";

function CarDetails() {
  const [flag, setFlag] = useState(false);
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValues, setInputValues] = useState({
    image: "",
    title: "",
    description: [],
    kilometersOnOdometer: "",
    majorScratches: "",
    originalPaint: "",
    accidentsReported: "",
    previousBuyers: "",
    registrationPlace: "",
    OEM_SpecsID: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_upload_preset);
    formData.append("cloud_name", process.env.REACT_APP_cloud_name);

    try {
      setFlag(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyv0uxpi2/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedImage(data.secure_url);
        setFlag(false);
      } else {
        console.error("Image upload failed.");
        setFlag(false);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setFlag(false);
    }
  };

  const handleInputFields = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(value);
  };

  const handleDescriptionChange = (e, index) => {
    const { value } = e.target;
    setInputValues((prevValues) => {
      const updatedDescription = [...prevValues.description];
      updatedDescription[index] = value;
      return {
        ...prevValues,
        description: updatedDescription,
      };
    });
  };

  const addDescriptionPoint = () => {
    setInputValues((prevValues) => ({
      ...prevValues,
      description: [...prevValues.description, ""],
    }));
  };

  const removeDescriptionPoint = (index) => {
    setInputValues((prevValues) => {
      const updatedDescription = [...prevValues.description];
      updatedDescription.splice(index, 1);
      return {
        ...prevValues,
        description: updatedDescription,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputValues.image = selectedImage;
    sendData();
    setInputValues({
      image: "",
      title: "",
      description: [],
      kilometersOnOdometer: "",
      majorScratches: "",
      originalPaint: "",
      accidentsReported: "",
      previousBuyers: "",
      registrationPlace: "",
      OEM_SpecsID: "",
    });
    setSelectedImage(null);
  };

  const sendData = async () => {
    const token = JSON.parse(localStorage.getItem("jwtoken"));
    try {
      let res = await fetch(`${process.env.REACT_APP_BASEURL}/cars`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      });
      let result = await res.json();
      if(result.status == "success"){
        toast({
          title: "Success",
          description: "Car Data added Successfully",
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
      console.log(result)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(error.message);
    }
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const getData = async () => {
    try {
      // Make the API call to search for OEM_Specs based on the search value
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/oem?query=${searchValue}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data);
        // console.log(data);
      } else {
        console.error("Search failed.");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    // Perform search query

    if (searchValue) {
      setTimeout(async () => {
        getData(searchValue);
      }, 1000);
    }
  }, [searchValue]);

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray.100"
        px={4}
        p={8}
      >
        <Box
          width="100%"
          maxW="500px"
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel fontSize="lg">Image</FormLabel>
              <Box
                mb={4}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected Car Image"
                    borderRadius="md"
                    w={"xs"}
                  />
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    isRequired
                  />
                )}
              </Box>

              <FormLabel fontSize="lg">Title</FormLabel>
              <Input
                placeholder="Enter car title"
                mb={4}
                name="title"
                value={inputValues.title}
                onChange={handleInputFields}
                isRequired
              />

              <FormLabel fontSize="lg">Description</FormLabel>
              <VStack align="start" spacing={2} mb={4}>
                {inputValues.description.map((point, index) => (
                  <Box key={index}>
                    <Textarea
                      placeholder={`Bullet ${index + 1}`}
                      value={point}
                      onChange={(e) => handleDescriptionChange(e, index)}
                      isRequired
                    />
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeDescriptionPoint(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button size="sm" onClick={addDescriptionPoint}>
                  Add Point
                </Button>
              </VStack>

              <FormLabel fontSize="lg">Kilometers on Odometer</FormLabel>
              <Input
                placeholder="Enter kilometers on odometer"
                mb={4}
                name="kilometersOnOdometer"
                type="number"
                value={inputValues.kilometersOnOdometer}
                onChange={handleInputFields}
                isRequired
              />

              <FormLabel fontSize="lg">Major Scratches</FormLabel>
              <Input
                placeholder="Enter major scratches details"
                mb={4}
                name="majorScratches"
                value={inputValues.majorScratches}
                onChange={handleInputFields}
                isRequired
              />

              <FormLabel fontSize="lg">Original Paint</FormLabel>
              <Select
                placeholder="Select an option"
                mb={4}
                name="originalPaint"
                value={inputValues.originalPaint}
                onChange={handleInputFields}
                isRequired
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>

              <FormLabel fontSize="lg">Accidents Reported</FormLabel>
              <Input
                placeholder="Enter number of accidents reported"
                mb={4}
                name="accidentsReported"
                type="number"
                value={inputValues.accidentsReported}
                onChange={handleInputFields}
                isRequired
              />

              <FormLabel fontSize="lg">Previous Buyers</FormLabel>
              <Input
                placeholder="Enter number of previous buyers"
                mb={4}
                name="previousBuyers"
                type="number"
                value={inputValues.previousBuyers}
                onChange={handleInputFields}
                isRequired
              />

              <FormLabel fontSize="lg">Registration Place</FormLabel>
              <Input
                placeholder="Enter registration place"
                mb={4}
                name="registrationPlace"
                value={inputValues.registrationPlace}
                onChange={handleInputFields}
                isRequired
              />
              <FormLabel fontSize="lg">Search OEM Specs</FormLabel>
              <Input
                placeholder="Enter search query"
                mb={4}
                value={searchValue}
                onChange={handleSearchInputChange}
                type="search"
              />

              {searchResults && searchResults.length > 0 && (
                <Select onChange={handleInputFields} name="OEM_SpecsID">
                  {searchResults.map((result) => (
                    <option  key={result._id} value={result._id}>
                      {result.Model}
                    </option>
                  ))}
                </Select>
              )}
              <Button
                type="submit"
                colorScheme=""
                size="lg"
                width="full"
                className={styles.loginbutton}
                borderRadius={20}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default CarDetails;
