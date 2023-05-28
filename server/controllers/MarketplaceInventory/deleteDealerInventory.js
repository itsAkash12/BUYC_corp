const MarketplaceInventoryModel = require("../../models/MarketplaceInventory.model");

const deleteDealerInventory = async (req,res) => {
  const userID = req.userID;
  const _id = req.params.id;
  try {
    const marketplaceInventory = await MarketplaceInventoryModel.find({
      userID,
      _id,
    });
    if (marketplaceInventory) {
      const deletedInventory = await MarketplaceInventoryModel.findByIdAndDelete(
        { _id }
      );
      const response = {
        status: "success",
        data: "Deleted Successfully",
      };
      return res.status(200).json(response);
    } else {
      const error_response = {
        status: "success",
        data: "You are Not Allowed for this operation",
      };
      return res.status(500).json(error_response);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = deleteDealerInventory;