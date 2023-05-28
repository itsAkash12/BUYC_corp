const CartModel  = require("../../models/Cart.model");

const getCartsController =  async(req, res) => {
  try {
    const userID = req.userID;
    const carts =  await CartModel.find({ userID }).populate({path : "MarketplaceInventoryID", populate : {
      path : 'OEM_SpecsID',
    }});

    const response = {
      status: "success",
      length : carts.length,
      data: carts,
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

module.exports =
  getCartsController
