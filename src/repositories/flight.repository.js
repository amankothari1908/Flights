const CrudRepository = require("./crud.repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const { db } = require("../models");
const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });

    return response;
  }

  async updateRemainingSeat(flightId, seats, descrease = 1) {
    await db.sequelize.query(addRowLockOnFlights(flightId));
    const flightObj = await Flight.findByPk(flightId);
    if (parseInt(descrease)) {
      await flightObj.decrement("totalSeats", { by: seats });
    } else {
      await flightObj.increment("totalSeats", { by: seats });
    }
    await flightObj.save();
    return flightObj;
  }
}

module.exports = FlightRepository;
