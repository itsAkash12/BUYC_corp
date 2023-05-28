const MarketplaceInventoryModel = require("../../models/MarketplaceInventory.model");

const editDealerInventory = async (req,res) => {
  const data = req.body;
  const userID = req.userID;
  const _id = req.params.id;
  try {
    const marketplaceInventory = await MarketplaceInventoryModel.find({
      userID,
      _id,
    });
    if (marketplaceInventory) {
      const updateInventory = await MarketplaceInventoryModel.findByIdAndUpdate(
        { _id },
        data
      );
      const response = {
        status: "success",
        data: "Updated Successfully",
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
module.exports = editDealerInventory;