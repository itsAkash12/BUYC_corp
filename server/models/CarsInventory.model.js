const mongoose = require("mongoose");

const CarInventorySchema = new mongoose.Schema(
  {
    dealerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    OEM_SpecsID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OEM_Specs",
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

const CarInventoryModel = mongoose.model(
  "CarInventory",
  CarInventorySchema
);
module.exports = CarInventoryModel;
