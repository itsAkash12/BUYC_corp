const MarketplaceInventoryModel = require("../../models/MarketplaceInventory.model");

const postMarketplaceInventory = async (req,res) => {
  try {
    const inventoryData = req.body;
    inventoryData.userID = req.userID;

    const marketplaceInventoryData = new MarketplaceInventoryModel(
      inventoryData
    );
    await marketplaceInventoryData.save();
    const response = {
      status: "success",
      message: "Car Data added successfully",
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

module.exports = postMarketplaceInventory;