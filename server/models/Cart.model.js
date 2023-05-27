const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      trim: true,
    },
    CarInventoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarInventory",
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
