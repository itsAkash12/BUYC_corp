import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return children;
};

export default PrivateRoute;
