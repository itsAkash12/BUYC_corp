const CartModel = require("../../models/Cart.model");

const postCartsController = async (req, res) => {
  try {
    const userID = req.userID;
    const {MarketplaceInventoryID} = req.body;
    console.log(MarketplaceInventoryID)
    const carts = await CartModel.create({ userID, MarketplaceInventoryID });
    const response = {
      status: "success",
      message: "Add to Cart successfully",
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

module.exports = postCartsController;
