const { Router } = require("express");
const IsLogin = require("../middlewares/isLogin.middleware");
const IsDealer = require("../middlewares/IsDealer.middleware");
const postMarketplaceInventory = require("../controllers/MarketplaceInventory/postMarketplaceInventory");
const getMarkteplaceInventory = require("../controllers/MarketplaceInventory/getMarketplaceInventory");
const getDealerInventory = require("../controllers/MarketplaceInventory/getDealerInventory");
const editDealerInventory = require("../controllers/MarketplaceInventory/editDealerInventory");
const deleteDealerInventory = require("../controllers/MarketplaceInventory/deleteDealerInventory");

const marketplaceInventory = Router();

marketplaceInventory.post("/", IsLogin, IsDealer, postMarketplaceInventory);

marketplaceInventory.route("/").get(getMarkteplaceInventory);
marketplaceInventory.get("/me", IsLogin, IsDealer, getDealerInventory);
marketplaceInventory.patch("/me/:id", IsLogin, IsDealer, editDealerInventory);
marketplaceInventory.delete("/me/:id", IsLogin, IsDealer, deleteDealerInventory);


module.exports = marketplaceInventory;
