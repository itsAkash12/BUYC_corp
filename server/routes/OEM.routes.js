const { Router } = require("express");
const GetOemSpecs = require("../controllers/OEM/GetOem.controller");
const PostOemSpecs = require("../controllers/OEM/PostOem.controller");

const OEMRouter = Router();

OEMRouter.route("/").post(PostOemSpecs).get(GetOemSpecs);

module.exports = OEMRouter;
