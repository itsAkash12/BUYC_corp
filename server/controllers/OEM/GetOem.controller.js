const OemModel = require("../../models/OEM.model");

const GetOemSpecs = async (req, res) => {
  try {
    const OEM_Specs_Data = await OemModel.find();

    const response = {
      status: "success",
      data: OEM_Specs_Data,
    };

    return res.status(200).json(response);
  } catch (error) {
    const error_response = {
      status: "failed",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = GetOemSpecs;
