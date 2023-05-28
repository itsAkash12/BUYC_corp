import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Homepage from "../Pages/Homepage";
import CarDetails from "../Pages/CarDetails";
import PrivateRoute from "./PrivateRoute";
import SingleDetails from "../Pages/SingleDetails";
import Dashboard from "../Pages/Dashboard";
import Cart from "../Pages/Cart";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/car-details" element={<PrivateRoute><CarDetails /></PrivateRoute>} />
      <Route path="/single-details" element={<SingleDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
    </Routes>
  );
};

export default AllRoutes;
