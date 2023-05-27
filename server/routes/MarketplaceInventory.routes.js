const { Router } = require("express");
const IsLogin = require("../middlewares/isLogin.middleware");
const IsDealer = require("../middlewares/IsDealer.middleware");

const carsInventoryRouter = Router();

carsInventoryRouter
  .route("/dealer")
  .post(IsLogin, IsDealer)
  .get(IsLogin, IsDealer);

carsInventoryRouter.route("/").get();

carsInventoryRouter
  .route("/:id")
  .get(IsLogin, IsDealer)
  .patch(IsLogin, IsDealer)
  .delete(IsLogin, IsDealer);

module.exports = carsInventoryRouter;
