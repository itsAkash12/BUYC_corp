require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const auth = require("./routes/Auth.routes");
const connection = require("./config/db");
const OEMRouter = require("./routes/OEM.routes");
const carsInventoryRouter = require("./routes/MarketplaceInventory.routes");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is from Backend");
});

app.use("/auth", auth);
app.use("/oem", OEMRouter);
app.use("/cars", carsInventoryRouter)

app.listen(PORT, () => {
  connection();
  console.log(`server started on http://localhost:${PORT}`);
});
