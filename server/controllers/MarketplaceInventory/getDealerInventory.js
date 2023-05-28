const MarketplaceInventoryModel = require("../../models/MarketplaceInventory.model");

const getDealerInventory = async (req, res) => {
    const userID = req.userID;
  try {

    // Search for OEM_Specs based on the search query
    const marketplaceInventoryData = await MarketplaceInventoryModel.find({userID}).populate("OEM_SpecsID");

    const response = {
      status: "success",
      data: marketplaceInventoryData,
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

module.exports = getDealerInventory;
