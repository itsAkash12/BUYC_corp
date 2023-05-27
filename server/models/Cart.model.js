const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      trim: true,
    },
    MarketplaceInventoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MarketplaceInventory",
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
