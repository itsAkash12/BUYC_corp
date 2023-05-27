const MarketplaceInventoryModel = require("../../models/MarketplaceInventory.model");

const getMarkteplaceInventory = async (req, res) => {
  try {
    const { query } = req.query;

    // Prepare the search query
    const searchQuery = query
      ? { Model: { $regex: query, $options: "i" } }
      : {};

    // Search for OEM_Specs based on the search query
    const marketplaceInventoryData = await MarketplaceInventoryModel.find(searchQuery);

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

module.exports = getMarkteplaceInventory;
