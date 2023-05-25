const mongoose = require("mongoose");

const oemSchema = new mongoose.Schema(
  {
    Model: {
      type: String,
      required: true,
    },
    Year: {
      type: Number,
      required: true,
    },
    ListPrice: {
      type: String,
      required: true,
    },
    Colors: {
      type: [String],
      required: true,
    },
    Mileage: {
      type: String,
      required: true,
    },
    Power: {
      type: Number,
      required: true,
    },
    MaxSpeed: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OemModel = mongoose.model("OEM_Specs", oemSchema);
module.exports = OemModel