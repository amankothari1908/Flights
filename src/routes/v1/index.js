const express = require("express");

const router = express.Router();

const airplaneRoutes = require("./airplane.route");
const cityRoutes = require("./city.routes");
const airportRoutes = require("./airport.routes");
const flightRoutes = require("./flight.route");

router.use("/airplanes", airplaneRoutes);

router.use("/cities", cityRoutes);

router.use("/airports", airportRoutes);

router.use("/flights", flightRoutes);

module.exports = router;
