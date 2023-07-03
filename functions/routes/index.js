const express = require("express");
const router = express.Router();
const UserRoutes = require("./user.routes");

router.use("/users", UserRoutes);

module.exports = router;
