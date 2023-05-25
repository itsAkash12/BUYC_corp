const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    gender: { type: String, required: true, trim: true },
    avatar: { type: String, trim: true },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["dealer", "user"],
      default: "user",
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthModel = mongoose.model("auths", authSchema);


module.exports = AuthModel;