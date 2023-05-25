require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const DB_URL = process.env.DB_URL;
const connection = async () => {
  try {
    const connect = mongoose.connect(DB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log({ error, message: "Cannot connect to DB" });
  }
};

module.exports = connection;
