const AuthModel = require("../models/Auth.model");

const IsDealer = async (req, res, next) => {
  try {
    const userID = req.userID;
    const user = await AuthModel.findOne({ _id: userID });
    if (!user) {
      return res
        .status(404)
        .json({ status: "Not found!", message: "Please Login First!" });
    }
    if (user.role !== "dealer") {
      return res.status(404).json({
        status: "Not found!",
        message: "You are authorized for performing such operations!",
      });
    }
    next();
  } catch (error) {
    const error_response = {
      status: "failed",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = IsDealer;
