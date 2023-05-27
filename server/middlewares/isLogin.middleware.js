const jwt = require("jsonwebtoken");
const AuthModel  = require("../models/Auth.model");

const IsLogin = async (req, res, next) => {
  try {
    let token = req.headers.authorization || false;
    if (!token) {
      return res
        .status(404)
        .send({ status: "Not found!", message: "Please Login First" });
    }
    let { id } = jwt.verify(token, process.env.SECRET_KEY);

    req.userID = id;
    next();
  } catch (error) {
    // Create error response
    const error_response = {
      status: "failed",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = 
IsLogin
