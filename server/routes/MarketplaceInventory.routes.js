const { Router } = require("express");
const IsLogin = require("../middlewares/isLogin.middleware");
const IsDealer = require("../middlewares/IsDealer.middleware");
const postMarketplaceInventory = require("../controllers/MarketplaceInventory/postMarketplaceInventory");
const getMarkteplaceInventory = require("../controllers/MarketplaceInventory/getMarketplaceInventory");

const marketplaceInventory = Router();

marketplaceInventory.post("/", IsLogin, IsDealer, postMarketplaceInventory);

marketplaceInventory.route("/").get(getMarkteplaceInventory);

marketplaceInventory
  .route("/:id")
  .get(IsLogin, IsDealer)
  .patch(IsLogin, IsDealer)
  .delete(IsLogin, IsDealer);

module.exports = marketplaceInventory;
