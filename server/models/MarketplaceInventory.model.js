const mongoose = require("mongoose");
const MarketplaceInventorySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    kilometersOnOdometer: {
      type: String,
      required: true,
    },
    majorScratches: {
      type: String,
      required: true,
    },
    originalPaint: {
      type: Boolean,
      required: true,
    },
    accidentsReported: {
      type: String,
      required: true,
    },
    previousBuyers: {
      type: String,
      required: true,
    },
    registrationPlace: {
      type: String,
      required: true,
    },
    OEM_SpecsID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OEM_Specs",
      trim: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MarketplaceInventoryModel = mongoose.model(
  "MarketplaceInventory",
  MarketplaceInventorySchema
);
module.exports = MarketplaceInventoryModel;