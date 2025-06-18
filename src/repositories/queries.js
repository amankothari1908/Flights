function addRowLockOnFlights(flightId) {
  return `SELECT * FROM FLIGHTS WHERE Flights.id = ${flightId} FOR UPDATE;`;
}

module.exports = { addRowLockOnFlights };
