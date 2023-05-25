const mongoose = require("mongoose");
const MarketplaceInventorySchema = new mongoose.Schema(
  {
    KMsOnOdometer: {
      type: Number,
      required: true,
    },
    MajorScratches: {
      type: Boolean,
      required: true,
    },
    OriginalPaint: {
      type: Boolean,
      required: true,
    },
    NumberOfAccidents: {
      type: Number,
      required: true,
    },
    NumberOfPreviousBuyers: {
      type: Number,
      required: true,
    },
    RegistrationPlace: {
      type: String,
      required: true,
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