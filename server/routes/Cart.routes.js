const { Router } = require("express");
const IsLogin = require("../middlewares/isLogin.middleware");
const postCartsController = require("../controllers/cart/postCart");
const getCartsController = require("../controllers/cart/getCart");
const deleteCart  = require("../controllers/cart/deleteCart");

const cartRouter = Router();

cartRouter
  .route("/")
  .post(IsLogin, postCartsController)
  .get(IsLogin, getCartsController);
cartRouter.route("/:id").delete(deleteCart);

module.exports = cartRouter;
