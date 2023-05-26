import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Homepage from "../Pages/Homepage";
import CarDetails from "../Pages/CarDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/car-details" element={<CarDetails />} />
    </Routes>
  );
};

export default AllRoutes;
