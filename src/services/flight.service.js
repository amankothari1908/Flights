const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");
const { compareTime } = require("../utils/helpers/dateTime.helper");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (compareTime(arrivalTime, departureTime)) {
      throw new AppError(
        "Arrival time is less than departure time",
        StatusCodes.BAD_REQUEST
      );
    }

    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  // trips =  MUM-DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    // add a check these two should not be same
  }

  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + "23:59:00"],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "can not fetch all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
