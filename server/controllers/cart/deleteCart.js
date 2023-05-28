const CartModel = require("../../models/Cart.model");

const deleteCart = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const isCartExists = await CartModel.find({ _id });
    if (!isCartExists) {
      return res
        .status(404)
        .json({ status: "Not found!", message: "Cart data doesn't exists" });
    }
    // delete data
    const delete_cart = await CartModel.findByIdAndDelete({ _id });
    // Create response
    const response = {
      status: "success",
      message: "Successfully Deleted",
    };
    return res.status(201).json(response);
  } catch (error) {
    // Create error response
    const error_response = {
      status: "failed",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = deleteCart;
