const {Router} = require("express").Router();
const {
  checkIsDealerMiddlware,
} = require("../middleware/CheckIsDealer.middleware");
const {
  checkIsLoginMiddleware,
} = require("../middleware/CheckIsLogin.middleware");

const carsInventoryRouter = Router();

carsInventoryRouter
  .route("/dealer")
  .post(checkIsLoginMiddleware, checkIsDealerMiddlware)
  .get(checkIsLoginMiddleware, checkIsDealerMiddlware);

  carsInventoryRouter.route("/").get();

carsInventoryRouter
  .route("/:id")
  .get(checkIsLoginMiddleware, checkIsDealerMiddlware)
  .patch(checkIsLoginMiddleware, checkIsDealerMiddlware)
  .delete(checkIsLoginMiddleware, checkIsDealerMiddlware);

module.exports = carsInventoryRouter;
