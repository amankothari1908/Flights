const express = require("express");

const router = express.Router();

const airplaneRoutes = require("./airplane.route");
const cityRoutes = require("./city.routes");
const airportRoutes = require("./airport.routes");

router.use("/airplanes", airplaneRoutes);

router.use("/cities", cityRoutes);

router.use("/airports", airportRoutes);

module.exports = router;
