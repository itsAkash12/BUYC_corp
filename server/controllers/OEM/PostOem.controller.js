const OemModel = require("../../models/OEM.model");

const PostOemSpecs = async (req, res) => {
  try {
    const OEM_Data = new OemModel(req.body);

    await OEM_Data.save();

    const response = {
      status: "success",
      message: "Data added successfully",
    };

    return res.status(200).json(response);
  } catch (error) {
    const error_response = {
      status: "fail",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = PostOemSpecs;