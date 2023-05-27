import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import styles from "../Styles/LoginButton.module.css";
import Navbar from "../Components/Navbar";

function CarDetails() {
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValues, setInputValues] = useState({
    image: "",
    title: "",
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  });

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
    const name = e.target.name;
    const value = e.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = () => {
    inputValues.image = selectedImage;
    console.log(inputValues);
  };

  return (
    <Box>
      <Navbar></Navbar>
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
          <FormControl>
            <FormLabel fontSize="lg">Image</FormLabel>
            <Box mb={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
              onChange={handleInputFields}
              isRequired
            />

            <FormLabel fontSize="lg">5 Bullet Point Description</FormLabel>
            <VStack align="start" spacing={2} mb={4}>
              <Textarea
                placeholder="Bullet 1"
                name="point1"
                onChange={handleInputFields}
                isRequired
              />
              <Textarea
                placeholder="Bullet 2"
                name="point2"
                onChange={handleInputFields}
                isRequired
              />
              <Textarea
                placeholder="Bullet 3"
                name="point3"
                onChange={handleInputFields}
                isRequired
              />
              <Textarea
                placeholder="Bullet 4"
                name="point4"
                onChange={handleInputFields}
                isRequired
              />
              <Textarea
                placeholder="Bullet 5"
                name="point5"
                onChange={handleInputFields}
                isRequired
              />
            </VStack>

            <Button
              isLoading={flag}
              borderRadius={20}
              colorScheme=""
              type="submit"
              className={styles.loginbutton}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default CarDetails;
